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
// #include "effects.jsx"
// #include "actions.jsx"




var folders = new Array();
var skippedFolders = ["cubemaps", "effects", "shadertests", "sky", "terrain", "interface", "test", 
                        "water", "character" ];

var logFile = new File("C:\\Users\\marcel\\Desktop\\landscape_stone.txt");
var logFile_n = new File("C:\\Users\\marcel\\Desktop\\landscape_stone_n.txt");
logFile.open("w");
logFile_n.open("w");
parseFolder(Folder("C:\\Users\\marcel\\Desktop\\parsingFiles\\stone"));

logFile.close();
logFile_n.close();


function parseFolder(folderObj)
{
    var fileList = folderObj.getFiles("*.dds");

    for(var i=0; i<fileList.length; i++) 
    {
        var name = fileList[i].name.toLowerCase();

        if (name.indexOf("_n") > -1)
        {
            logFile_n.writeln(fileList[i].name);
        }
        else if (name.indexOf("_g") == -1 && 
                    name.indexOf("_em") == -1 && 
                    name.indexOf("_m") == -1)
        {
            logFile.writeln(File.decode(fileList[i].name));
        }
    }
}






// --------------------------------------------------------------------------------
// Main function to parse a Skyrim textures folder.
// --------------------------
function Parse(folderPath)
{
    createFolderList(new Folder(folderPath));

    for(var i=0; i<folders.length; i++) {
        parseFolder(folders[i]);
    }
}


// --------------------------------------------------------------------------------
// Scan all subfolders to validate if we will analyse their files content.
// --------------------------
function createFolderList(folderObj)
{
    var folderName = Folder.decode(folderObj.name).toLowerCase();

    if (Array.Contains(skippedFolders, folderName)) return;

    folders.push(folderObj);

    var fileList = folderObj.getFiles();
    for(var i=0; i<fileList.length; i++) {
        if (fileList[i] instanceof Folder)
        {
            createFolderList(fileList[i]);
        }
    }
}
