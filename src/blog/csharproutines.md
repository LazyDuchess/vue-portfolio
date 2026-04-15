---
title: Writing a custom C# scheduler and serializer
description: Solving the problem of saving and loading coroutine state in C#, in an elegant, engine-agnostic way.
date: 2026-04-12
thumbnail: blog/csharp.png
seoimage: https://lazyduchess.online/blog/csharp.png
category: C#,Godot
---

# Writing a custom C# routine scheduler and serializer

## The problem

This is probably going to sound a bit niche, but I always found it very cool how The Sims was able to save simulator state, in the middle of interactions or routines running, and on load be able to restore the whole simulation, routines included, and just resume them like nothing happened.

The Sims 2 uses its own language called SimAntics, which I've [reimplemented in the past for OpenTS2](https://github.com/LazyDuchess/OpenTS2/blob/master/Assets/Scripts/OpenTS2/SimAntics/VM.cs). This is the logical way to go - you, as the programmer, handle the entire execution context, including the stack and its variables, so you can tailor your virtual machine to save and load any variable properly. Everything is under your control.

What's most interesting to me is how The Sims 3 does it. Much like Unity, it uses Mono for its scripting, so the game's routines and simulation layer is all C#. Despite that, as far as I can tell, the game can easily save and restore in the middle of yielded C# methods. I've googled as hard as I could to find examples of this, surely if this game manages to serialize the whole C# stack and execution context and restore it willy nilly there must be some built-in way to do this in Mono, right?

Apparently not! Common consesus seems to be that this would be a terrible idea, despite this game seemingly doing just that. So there is no implementation of something like this I can find online. It's also a really common problem in game development I feel like, wouldn't it be nice to have a way to easily save the state of, say, coroutines in Unity? Sure you could hardcode something somewhat decent, maybe save some kind of state counter and skip ahead depending on its value, but this isn't elegant enough for me.

As a retro Sims fan, the delusion that one day I will make my own life sim and compete with the giants crosses my mind every once in a while. Even though I'm aware of the fact that this is like, far, FAAAR from realistic, it gives me the motivation to make some really fun projects, so I love to use it as an excuse to get things done, and this is no exception.

In the spirit of this, I thought it would be a really cool problem to tackle. After all what good is it if i can't restore two characters being in the middle of a conversation, or asleep, or building skills, when saving and loading.

## The proposal

I thought I would use my previous experience writing the SimAntics VM for OpenTS2 to make something similar. Serializing a Unity coroutine or an IEnumerator seems like a no-go for me, especially without source code access, so I would like to make a system that's as similar as possible to writing raw C#, while being able to serialize and deserialize method state.

So I'd write a "Simulator" class, that keeps track of and schedules all running routines, and much like SimAntics each routine has a stack of function calls, all composed of individual commands. Some commands yield, and these can serialize and deserialize their current state, and others just run in a single frame/tick.

## Serializable Variables

I thought I'd start small - so I made a custom generic class that all it does is store an object:

![The basic implementation of serializable variables](/blog/csharproutines/step1.png)

My idea is that, when it's time to serialize or deserialize a class, using Reflection I'd grab every field in the class, and if it implements this interface then I'd consider it to be serializable and save and load it. I could have used an attribute, or just made it automatic and serialized everything, within reason, but I think this is a lot more obvious and transparent to the user and makes it harder to make mistakes and serialize wrong things. Plus it lets me override its getter and setter if I ever need to in the future.

## Commands and Routines

This was the part that i found a little bit more difficult to wrap my head around. I wasn't gonna use IEnumerables, or any kind of built-in coroutine, so I basically had to sort of reinvent the wheel and recreate the concept of functions and routines and yielding inside C#.

![oh boy that is a lot](/blog/csharproutines/functiondesign.png)

This is what I came up with. Basically, from top level:

* Routines: They keep a stack of functions, when ticked, they run the current commmand at the topmost function on the stack.
* Functions: These are the individual functions. They keep a list of commands, and run them sequentially when ticked. When a yielding command is found, they will of course wait the tick out until the command signals to stop yielding.
* Commands: These are the pieces of code that the functions execute. A command can run instantly and not yield, or it can have special code to yield. Most commands are just going to be C# lambdas, with the special exceptions mostly being yielding commands. For example, currently there is a basic "Wait X seconds" command.

The design is very intentional, so that writing custom functions feels as close to writing C# as possible, but with its own set of caveats and quirks.

As an example, here is a simple routine that just counts upwards, waiting a second in between each.. second:

![I mean it's alright](/blog/csharproutines/testfunction.png)

So how it works, is that the program will call **Build()**, and expect this method to put commands into the currently empty **CommandQueue** of the function. Seconds elapsed are stored as a SerializableVariable<>, meaning the simulator will save and load its value, and **CommandBranch** has a lot of helper methods that push commands into the stack, like sleep or conditionals, in order to make your life easier. If you just need raw non yielding C# you can just write a lambda.

I'm honestly really happy with this design, it is a little bit more convoluted than just writing a straight C# method, but I think it looks pretty and organized in its own way.

This is what the sleep command looks like:

![eep](/blog/csharproutines/sleepcommand.png)

Pulling the time is a lambda in case you want to do something fancy or use a variable. Then the evaluated time and the timer are both serializables, so the scheduler will have no problem saving and loading in the middle of its execution.

## The Scheduler

This is the most straightforward part of the project. Just have a list of routines, and on each **Tick()** call, advance them:

![Simulator routine ticking implementation](/blog/csharproutines/scheduler.png)

The Routine Tick method however... I think it's definitely the ugliest part of the codebase, and due for a refactor, although it is mostly just because of me repeating code WAY too much:

![Oh wow that is a TON of code](/blog/csharproutines/routinetick.png)

It barely fits on screen!

## The Final Result

![It works!](/blog/csharproutines/saving.gif)

There it is! Look! It's counting! And i can serialize it and rollback to the previous state! Wooo!

Okay, I do realize this looks very underwhelming, but hear me out: *it scales*

With this system in place, you can write any coroutine, something waay more complex than just counting numbers, and the code will handle saving and loading it with very little to no extra work from the programmer.

So yeah. One tiny step closer to a life sim. Isn't that neat?