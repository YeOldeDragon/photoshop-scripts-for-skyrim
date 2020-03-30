/*
<javascriptresource>
<name>Skyrim Batch Resize Script</name>
<about>Script for resizing Skyrim textures.</about>
<menu>filter</menu>
<category>Skyrim</category>
<enableinfo>true</enableinfo>
</javascriptresource>
*/
/* --------------------------------------------------------------------------------
MIT License

Copyright (c) 2020 YeOldeDragon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
-------------------------------------------------------------------------------- */


#target photoshop
#include "batch_skyrim_textures_editor.jsx"


// Get the folder to process
//var _basePath = Folder.selectDialog( "Select Skyrim Textures folder to resize." );
var _basePath = "~/Desktop/result/1024";

// This is the folder where to copy resized files
var _destPath = "~/Desktop/result/512";


var folders = new Array();
var skippedFolders = ["cubemaps", "effects", "shadertests", "sky", "terrain", "interface", "test", 
                      "water", "character" ];

var _actions = new Actions();

createFolderList(new Folder(_basePath));

for(var i=0; i<folders.length; i++) {
    parseFolder(folders[i]);
}



function createFolderList(folderObj)
{
    var folderName = Folder.decode(folderObj.name).toLowerCase();

    if (Array.Contains(skippedFolders, folderName)) 
    {
        copySkippedFiles(folderObj);
        return;
    };

    folders.push(folderObj);

    var fileList = folderObj.getFiles();
    for(var i=0; i<fileList.length; i++) {
        if (fileList[i] instanceof Folder)
        {
            createFolderList(fileList[i]);
        }
    }
}


function copySkippedFiles(folderObj)
{
    var fileList = folderObj.getFiles();
    for(var i=0; i<fileList.length; i++) {
        if (fileList[i] instanceof Folder)
        {
            copySkippedFiles(fileList[i]);
        }
        else
        {
            var treePath = fileList[i].path.replace(_basePath, ""); 
            var folderObj = new Folder(_destPath + treePath);
            if (!folderObj.exist)
            {
                // Create folder if it doesn't exist.
                folderObj.create();
            }

            // Copy file in destination folder
            fileList[i].copy(_destPath + treePath + "/" + fileList[i].name);
        }
    }
}


function parseFolder(folderObj)
{
    var fileList = folderObj.getFiles("*.dds");

    for(var i=0; i<fileList.length; i++) 
    {
        var treePath = fileList[i].path.replace(_basePath, ""); 
        var folderObj = new Folder(_destPath + treePath);
        if (!folderObj.exist)
        {
            // Create folder if it doesn't exist.
            folderObj.create();
        }

        // Copy file in destination folder
        fileList[i].copy(_destPath + treePath + "/" + fileList[i].name);

        // Open the copied file to edit.
        var doc = open(new File(_destPath + treePath + "/" + fileList[i].name));

        // If file is too small, we skip
        if (doc.width >= 1024 || doc.height >= 1024) 
        {
            _actions.ResizeByPercent(doc, 0.5);            
            doc.save();
        }
        doc.close();
    }
}