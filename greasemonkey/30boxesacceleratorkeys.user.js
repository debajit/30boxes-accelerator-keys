// 30 Boxes Accelerator Keys
// Version 1.0
// 2006-07-08
// Copyright (c) 2006, Debajit Adhikary, http://debajit.com/
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          30 Boxes Accelerator Keys
// @namespace     http://github.com/debajit/30boxes-accelerator-keys
// @description	  One click keyboard shortcuts for 30 Boxes
// @include       http://30boxes.com/*
// @include       http://www.30boxes.com/*
// @exclude       http://www.30boxes.com/account
// @exclude       http://www.30boxes.com/account/*
// @exclude       http://www.30boxes.com/blog
// @exclude       http://www.30boxes.com/blog/*
// @exclude       http://www.30boxes.com/forum
// @exclude       http://www.30boxes.com/forum/*
// @exclude       http://www.30boxes.com/donate
// @exclude       http://www.30boxes.com/donate/*
// ==/UserScript==


// Look for Find dialog form
var form30boxesAcceleratorKeys_ = document.getElementsByTagName("form");
for(var i = 0; i < form30boxesAcceleratorKeys_.length; ++i)
{
    if(form30boxesAcceleratorKeys_[i].parentNode.id == "findPopup")
    {
        form30boxesAcceleratorKeys_[i].addEventListener("submit",
        function()
        {
            // Hide Find Dialog after find operation
            document.getElementById("findPopup").style.visibility = "hidden";
            document.getElementById("findInput").blur();
        },
        false);
        break;
    }
}

window.addEventListener("keydown",
function (e)
{
    // We want only single keys, no modifiers
    if(e.shiftKey || e.ctrlKey || e.altKey || e.metaKey)
        return false;

    // Esc is allowed even when you're editing text
    if(e.keyCode == 27)
    {
        // Hide Find Dialog
        document.getElementById("findPopup").style.visibility = "hidden";
        document.getElementById("findInput").blur();

        // Hide other dialogs etc.
        with(unsafeWindow)
        {
            hideEditEvent();
            hideDayView();
            showWindowShade('indexWindowShade','none');
            hideSearchView();
        	hideTodos();
        	oneBoxPopupDone(false, 'input');
        	oneBoxPopupDone(false, 'todoInput');
        	oneBoxPopupDone(false, 'editEventInvites');
        	oneBoxPopupDone(false, 'dayViewInput');
        	oneBoxPopupDone(false, '');
        }
    }

    // We don't want to intercept keystrokes when the user is typing
    switch(e.target.tagName)
    {
        case "TEXTAREA":
            return false;

        case "INPUT":

            // If focus is on the Zoom button in Find dialog, we want
            // the shortcut keys to still have effect
            if(e.target.getAttribute("type") != "image")
                return false;
    }

    var key = String.fromCharCode(e.keyCode);

    // Escape
    if (e.keyCode == 27 || key == "E")
    {
        // Hide Find dialog
        document.getElementById("findPopup").style.visibility = "hidden";
        document.getElementById("findInput").blur();

        // Hide other dialogs etc.
        with(unsafeWindow)
        {
            hideEditEvent();
            hideDayView();
            showWindowShade('indexWindowShade','none');
            hideSearchView();
        	hideTodos();
        	oneBoxPopupDone(false, 'input');
        	oneBoxPopupDone(false, 'todoInput');
        	oneBoxPopupDone(false, 'editEventInvites');
        	oneBoxPopupDone(false, 'dayViewInput');
        	oneBoxPopupDone(false, '');
        }
    }

    switch(key)
    {
        // Toggle Buddy list in Webtop
        case "B":
            unsafeWindow.toggleDisplay("webtopView");
            break;

        // Display the calendar
        case "C":

            // Hide Find dialog
            document.getElementById("findPopup").style.visibility = "hidden";
            document.getElementById("findInput").blur();

            // Hide webtop
            document.getElementById("webtop").style.display = "none";

            break;

        // Find
        case "F":

            // "Press" Esc
            try
            {
                with(unsafeWindow)
                {
                    hideEditEvent();
                    hideDayView();
                    showWindowShade('indexWindowShade','none');
                    hideSearchView();
                	hideTodos();
                	oneBoxPopupDone(false, 'input');
                	oneBoxPopupDone(false, 'todoInput');
                	oneBoxPopupDone(false, 'editEventInvites');
                	oneBoxPopupDone(false, 'dayViewInput');
                	oneBoxPopupDone(false, '');
                }
            }
            catch(e){}

            // Close webtop
            document.getElementById("webtop").style.display = "none";

            // Show find menu
            document.getElementById("findPopup").style.visibility = "visible";

            // Update find tags
            unsafeWindow.updateTagsInFindMenu();

            // Highlight
            with(document.getElementById("findInput"))
            {
                style.background = "#ffc";
                style.color = "#000";
                focus();
            }

            // Don't type F into the input box :) That F was simply to get to the Find dialog
            e.stopPropagation();
            e.preventDefault();

            break;

        // Jump to Today
        case "I":
            unsafeWindow.moveCalendarNow();
            break;

        // Scroll to older events
        case "J":
            unsafeWindow.moveCalendar(-60*60*24*7*1000);
            break;

        // Scroll to older events
        case "K":
            unsafeWindow.moveCalendar(60*60*24*7*1000);
            break;

        case "Q":

            // Hide Find dialog
            document.getElementById("findPopup").style.visibility = "hidden";
            document.getElementById("findInput").blur();

            // Hide other dialogs etc.
            try
            {
                with(unsafeWindow)
                {
                    hideEditEvent();
                    hideDayView();
                    showWindowShade('indexWindowShade','none');
                    hideSearchView();
                	hideTodos();
                	oneBoxPopupDone(false, 'input');
                	oneBoxPopupDone(false, 'todoInput');
                	oneBoxPopupDone(false, 'editEventInvites');
                	oneBoxPopupDone(false, 'dayViewInput');
                	oneBoxPopupDone(false, '');
                }
            }
            catch(e){}

            // Hide webtop
            document.getElementById("webtop").style.display = "none";

            // Highlight Quick Add input box
            with(document.getElementById("input"))
            {
                style.background = "#ffc";
                style.color = "#000";
                focus();
            }

            // Don't type Q in the quick add dialog! :)
            e.stopPropagation();
            e.preventDefault();
            break;

        // New Event
        case "N":
            unsafeWindow.showEditEvent(0);
            e.stopPropagation();
            e.preventDefault();
            break;

        // To Do Items
        case "T":

            // Hide Find dialog
            document.getElementById("findPopup").style.visibility = "hidden";
            document.getElementById("findInput").blur();

            // Show to do list
            unsafeWindow.showTodos();

            break;

        // Webtop
        case "W":
            unsafeWindow.toggleDisplayOn('webtop');
            unsafeWindow.showWebtopView('getRecentUpdatesForWebtop','');
            break;

        // Help
        case "H":
            alert(
                "W -- Webtop\n" +
                "C -- Calendar\n" +
                "T -- To Do Items\n" +
                "F -- Find\n" +
                "Q -- Quick Add (One Box)\n\n\n\n" +
                "J -- See Past Events in Calendar View\n" +
                "K -- See Future Events in Calendar View\n" +
                "I -- Jump to Today\n\n\n\n" +
                "E -- Close To Do List etc. (like Esc)\n" +
                "N -- Create New Event\n" +
                "B -- Toggle Buddy Updates in Calendar View\n" +
                "H -- Display this help on 30 Boxes Shortcut Keys\n"
            );
            break;
    }
}
, false);
