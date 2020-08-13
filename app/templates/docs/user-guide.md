# User Guide

## Prerequisites

To follow this guide, you will need a Solid account. You can create such an account on https://solid.community/ or https://inrupt.net/. Or, you can even host your own solid-server! More information about Solid and hosting your own server can be found on https://solidproject.org/.

For users who aren't familiar with the linked data terminologies, it is recommended to read the following documentations: 
* [RDF triple concepts](https://www.w3.org/TR/rdf-concepts)
* [RDFa primer](https://www.w3.org/TR/rdfa-primer)
* [RDFa core concepts](https://www.w3.org/TR/rdfa-core/)

## Introduction

This plugin gives one the possibility to import documents from a Solid pod. Using this plugin, you can perform the following tasks:
*    Logging in to your solid account
*    Fetching and importing your user profile
*    Managing your files on your Solid pod
*    Adding subjects to a file
*    Importing and adding triples of a subject on your Solid pod
*    Viewing and inserting subjects of a specific type
*    Editing, saving and resetting data in the editor

Surf to solid.say-editor.com, there you will be presented with a nice clean editor. Using the web app is just like any other text editors that you might have used in the past. 



## Part 1: Logging in and fetching your profile
To login to your Solid pod, you could type `solid:login` in the editor. 
A login card will then be generated on the right side of the editor to login to your Solid pod.

Although nothing would be added to the editor's content, you will be redirected to Solid's login page if you aren't already logged in. 

### Login card's caveat
Calling `solid:login` is not necessary, since the login card will always be generated if you're calling the other commands without being first logged in. 

**Note: The right pane of the editor contains all the possible cards that will appear with different commands.  Keep an eye out for them!** 
**We shall refer to this right pane of the editor as the "card stack", from now on.** 


## Part 2: Importing your user profile
To import your user profile, type `solid:me` in the editor. 
An info card will be added to the **card stack** with all the possible predicates values in your profile. 

You could choose the predicates you wanted to add to your document by checking the relevant checkboxes. Clicking on the `Insert` button will add the chosen predicates, into the document in a structured format.

**Note: In the info card, you might see the `Add Triple` button. See [Part 5](#Part-5-Inserting-and-adding-Triples) for more information**


## Part 3: Viewing, adding and editing files on your Solid pod
### Getting an overview of all your files in your Solid pod
To manage your files in your Solid pod, simply type `solid:files` in the editor.
A card that displays a file-tree, of all your files and folders found in your Solid pod, will be added to the **card stack**. You can insert a link to the file in the editor by selecting a file and then clicking the `Insert link` button.
### Adding files to your Solid pod.
You can add a file to a folder in your Solid pod by selecting a folder in the file-tree and clicking the `Add file` button.
### Managing the subjects in a file
When you select a file and click on `Open`, a **subject card** that displays all the subjects contained in that file, will be added to the **card stack**. On this card you have the option to add or open subjects.

## Part 4: Adding subjects to a file
On the **subject card**, you also have the possibility to add a subject to the opened file. Simply click on `Add subject`. A popup will show, where you can fill in the name of the subject and its type.

## Part 5: Inserting and adding Triples
### Inserting existing triples in the editor
When selecting and opening a subject in the subject card, a new card will be added to the **card stack**. It displays all the triples of the chosen subject, grouped per predicate.

*This card is exactly the same as the one you'll see in [Part 2](#Part-2-Importing-your-user-profile)*.

On this card, you can select any triple of any predicate you want. After selecting your predicates, insert them in the editor by clicking on the `Insert` button.

### Adding new triples to your Solid pod

To add a triple to the selected subject, simply click on `Add Triple`. You will be prompted by a popup where you can fill in the predicate and object of the new triple.

This popup also allows you to fill in more than 1 triples by clicking on the `Add Triple` button in the popup. 

After filling in your desired triples, save them to your Solid pod by clicking on the `Save` button.



## Part 6: Viewing and inserting subjects of a specific type
To get an overview of all the registered types in your Solid pod, type `solid:types`. 

A card will be added to the **card stack** and you can select a type and open it. When opening a type,  the **subject card** belonging to the file associated with the type will be shown. There you can add and open subjects of the file.

**Note: At the moment, it is not yet possible to register a type to a file using our editor. You can register types to files yourself in the publicTypeIndex and privateTypeIndex files on your Solid pod.**

## Part 7: Editing, saving and resetting data in the editor
You can simply edit triples in the editor. When you have made changes in the editor, a card will be generated that will allow you to save the changes to your Solid pod (with `Save`) , or to undo the local changes that you have made (with `Reset`).