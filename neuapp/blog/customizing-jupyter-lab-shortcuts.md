---
title: Customizing Jupyter Lab Shortcuts
description: How to setup custom keyboard shortcuts for Jupyter Lab.
date: 2020-12-06
slug: "/blog/customizing-jupyter-lab-shortcuts"
type: post

---

Jupyter Lab is a web application commonly used by data scientists to run Jupyter Notebooks.  Many data professionals write all their code in notebooks.

The default shortcuts in Jupyter Lab are good (take a look at our [Jupyter Lab guide](https://www.climate-code.com/blog/getting-the-most-jupyter-lab) for a list of the most important default shortcuts), but there are a few parts of the data science workflow that the default shortcuts don't cover.

Adding just a few custom shortcuts will lead to a major increase in the speed of your workflow.

In this article we will: 

- show you how to customize shortcuts in Jupyter Lab,
- give you a starter template on useful custom shortcuts.

We will setup custom shortcuts for:

- restarting the kernel,
- running all cells above this cell,
- opening a terminal,
- moving between tabs.


## How to customize shortcuts in Jupyter Lab

You can access the *Keyboard Shortcuts* menu using:

1. *Menu Bar* -> **Settings**
2. *Settings* -> **Advanced Settings Editor**
3. *Advanced Settings Editor* -> **Keyboard Shortcuts**
4. *Keyboard Shortcuts* -> **User Preferences**

If you haven't edited your Jupyter Lab shortcuts before, you'll have nothing in the *User Preferences* section.  

<center>
  <img src="/custom-jl-shortcuts/f1.png" width="80%" align="center">
  <br />
</center>

There are a few strategies for setting up *User Preferences*:

- copy all the *System Defaults* into *User Preferences*, and then modify the shortcuts you want to change
- only put the shortcuts we want to change into *User Preferences*, which is what we will do in this article

Either way, you'll benefit from having a copy of *System Defaults* open in a text editor, for easier searching (the Jupyter Lab search can leave a little wanting :).

## What do we want from custom shortcuts?

We have custom shortcuts setup for:

- restarting the kernel,
- running all cells above this cell,
- opening a terminal,
- moving between tabs.

We will go through all these in steps - you can see complete JSON for all these at the end of the post.


### Restarting the kernel & running all cells above

The most important custom shortcuts are those that make restarting the kernel quicker.  Its something you do a lot when using notebooks.

Which shortcut is best for you depends on how you like to restart the kernel - we use *Restart Kernel & Run All* the most.  The full shortcuts we use for managing the kernel are:

- restart & run all -> `F6`
- restart & clear -> `F7`
- run all above -> `F8`

Copying the JSON below directly into your *User Preferences* will give you these three custom shortcuts:

```json
{
    "shortcuts": [
        {
            "command": "runmenu:restart-and-run-all",
            "keys": [
                "F6"
            ],
            "selector": "[data-jp-code-runner]"
        },
        {
            "command": "kernelmenu:restart-and-clear",
            "keys": [
                "F7"
            ],
            "selector": "[data-jp-kernel-user]:focus"
        },
        {
            "command": "kernelmenu:run-all-above",
            "keys": [
                "F8"
            ],
            "selector": "[data-jp-kernel-user]:focus"
        }
    ]
}
```

You'll notice that we don't use `F5` - because this is often used as a *Refresh Page* shortcut in browsers.


### Open a terminal

We have this mapped to `Alt T`.  A common workflow for with this shortcut is:

- `Alt T` to open a terminal
- do some work
- `Alt ArrowUp` to switch back and forth with previous tab (usually a notebook)
- `Ctrl W` to close the terminal window

`Alt ArrowUp` is a custom shortcut as well - see the *Move between tabs* section below.

```json
{
    "shortcuts": [
        {
            "command": "terminal:open",
            "keys": [
                "Alt T"
            ],
            "selector": "body"
        }
    ]
}
```

### Move between tabs

The final shortcuts are to make moving around between open tabs using `Alt` + arrow keys:

- `Alt ArrowUp` -> previously used
- `Alt ArrowLeft` -> previous tab
- `Alt ArrowRight` -> next tab

```json
{
    "shortcuts": [
        {
            "command": "tabsmenu:activate-previously-used-tab",
            "keys": [
                "Alt ArrowUp"
            ],
            "selector": "body"
        },
        {
            "command": "application:activate-previous-tab",
            "keys": [
                "Alt ArrowLeft"
            ],
            "selector": "body"
        },
        {
            "command": "application:activate-next-tab",
            "keys": [
                "Alt ArrowRight"
            ],
            "selector": "body"
        }
    ]
}
```


## The full custom shortcuts JSON

Below is a copy of the full JSON we use to customize our shortcuts - you can copy this directly into *User Preferences*:

```json
{
    "shortcuts": [
        {
            "command": "sidebar:toggle",
            "keys": [
                "F9"
            ],
            "selector": ".jp-SideBar"
        },
        {
            "command": "runmenu:restart-and-run-all",
            "keys": [
                "F6"
            ],
            "selector": "[data-jp-code-runner]"
        },
        {
            "command": "kernelmenu:restart-and-clear",
            "keys": [
                "F7"
            ],
            "selector": "[data-jp-kernel-user]:focus"
        },
        {
            "command": "kernelmenu:run-all-above",
            "keys": [
                "F8"
            ],
            "selector": "[data-jp-kernel-user]:focus"
        },
        {
            "command": "terminal:open",
            "keys": [
                "Alt T"
            ],
            "selector": "body"
        },
        {
            "command": "tabsmenu:activate-previously-used-tab",
            "keys": [
                "Alt ArrowUp"
            ],
            "selector": "body"
        },
        {
            "command": "application:activate-previous-tab",
            "keys": [
                "Alt ArrowLeft"
            ],
            "selector": "body"
        },
        {
            "command": "application:activate-next-tab",
            "keys": [
                "Alt ArrowRight"
            ],
            "selector": "body"
        },
        {
            "command": "notebook:change-cell-to-code",
            "keys": [
                "W"
            ],
            "selector": ".jp-Notebook:focus"
        },
        {
            "command": "notebook:change-cell-to-markdown",
            "keys": [
                "M"
            ],
            "selector": ".jp-Notebook:focus"
        }
    ]
}
```

---

Thanks for reading!

If you enjoyed this post, make sure to take a look at our [Jupyter Lab guide](https://www.climate-code.com/blog/getting-the-most-jupyter-lab), for more tips & tricks for getting the most out of Jupyter Lab.
