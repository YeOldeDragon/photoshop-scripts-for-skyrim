/*
--------------------------------------------------------------------------------
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
#include "utilities.jsx"



// --------------------------------------------------------------------------------
// FolderParser class.
// --------------------------------------------------------------------------------
// This class will parse a specific Skyrim textures folder (and subfolders) to 
// load all "accepted" .dds files in some categorized arrays.
//
// Categorized arrays will allow user to apply specific Photoshop effects 
// on different file types.
// --------------------------------------------------------------------------------
function FolderParser()
{
    var folders = new Array();
    var skippedFolders = ["cubemaps", "effects", "shadertests", "sky", "terrain", "interface", "test", 
                          "water", "character" ];

    var _rockFiles = Array();
    var _plantFiles = Array();
    var _grassFiles = Array();
    var _treeFiles = Array();
    var _LODFiles = Array();
    var _clothFiles = Array();
    var _decalFiles = Array();
    var _otherFiles = Array();

    this.RockFiles = _rockFiles;
    this.PlantFiles = _plantFiles;
    this.GrassFiles = _grassFiles;
    this.TreeFiles = _treeFiles;
    this.LODFiles = _LODFiles;
    this.ClothFiles = _clothFiles;
    this.DecalFiles = _decalFiles;
    this.OtherFiles = _otherFiles;

    // --------------------------------------------------------------------------------
    // Main function to parse a Skyrim textures folder.
    // --------------------------
    this.Parse = function(folderUri)
    {
        createFolderList(new Folder(folderUri));

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

    // --------------------------------------------------------------------------------
    // Scan a folder for .dds files.
    // --------------------------
    function parseFolder(folderObj)
    {
        var fileList = folderObj.getFiles("*.dds");

        for(var i=0; i<fileList.length; i++) 
        {
            var name = fileList[i].name;

            if (name.indexOf("_n") == -1 &&
                name.indexOf("_g") == -1 && 
                name.indexOf("_em") == -1 && 
                name.indexOf("_m") == -1)
            {
                analyseFileName(folderObj, fileList[i]);
            }
        }
    }

    // --------------------------------------------------------------------------------
    // Analyse a .dds file to choose if we will keep it.
    // If so, it will choose the best categorized array to place the file.
    // --------------------------
    function analyseFileName(folderObj, fileObj)
    {
        var fileName = fileObj.name.toLowerCase();
        var folderName = folderObj.name.toLowerCase();
        var parentFolderName = folderObj.parent.name.toLowerCase();

        switch(folderName)
        {
            case "armor":
                _clothFiles.push(fileObj);
                return;

            case "caves":
                if (String.Contains(fileName, "wall") && !String.Contains(fileName, "ice"))
                {
                    _rockFiles.push(fileObj);
                    return;
                }
                if (String.Contains(fileName, "rock"))
                {
                    _rockFiles.push(fileObj);
                    return;
                }
                break;

            case "clutter":
                if (String.Contains(fileName, "birthsign") ||
                    String.Contains(fileName, "ore") ||
                    String.Contains(fileName, "statue") ||
                    String.Contains(fileName, "ingot") ||
                    String.Contains(fileName, "nightingalecircle") ||
                    String.Contains(fileName, "middenconjure") ||
                    String.Contains(fileName, "imperialwalls"))
                {
                    _rockFiles.push(fileObj);
                    return;
                }
                break;

            case "lod":
                _LODFiles.push(fileObj);
                return;

            case "plants":
                _plantFiles.push(fileObj);
                return;

            case "grass":
                _grassFiles.push(fileObj);
                return;

            case "trees":
                _treeFiles.push(fileObj);
                return;

            case "impactdecals":
                _decalFiles.push(fileObj);
                return;

            case "roads":
                _rockFiles.push(fileObj);
                return;

            case "trap":
                if (!String.Contains(fileName, "tripwiretrap"))
                {
                    _rockFiles.push(fileObj);
                    return;
                }
                break;
        }

        switch(parentFolderName)
        {
            case "lod":
                _LODFiles.push(fileObj);
                return;

            case "clothes":
            case "armor":
                _clothFiles.push(fileObj);
                return;

            case "dungeons":
                if (String.Contains(fileName, "wall") && !String.Contains(fileName, "ice"))
                {
                    _rockFiles.push(fileObj);
                    return;
                }
                if (String.Contains(fileName, "rock") || 
                    String.Contains(fileName, "mural") || 
                    String.Contains(fileName, "roof"))
                {
                    _rockFiles.push(fileObj);
                    return;
                }
                
                if (String.Contains(folderName, "dwemerruins") && 
                    !String.Contains(fileName, "map") && !String.Contains(fileName, "blank"))
                {
                    _rockFiles.push(fileObj);
                    return;
                }
                if (String.Contains(folderName, "imperial") && 
                    String.Contains(fileName, "floor") && !String.Contains(fileName, "wall"))
                {
                    _rockFiles.push(fileObj);
                    return;
                }
                if (String.Contains(folderName, "mines") && 
                    String.Contains(fileName, "ore") && !String.Contains(fileName, "rock"))
                {
                    _rockFiles.push(fileObj);
                    return;
                }
                if (String.Contains(folderName, "nordic") && 
                    !String.Contains(fileName, "glow"))
                {
                    _rockFiles.push(fileObj);
                    return;
                }
                if (String.Contains(folderName, "riften") && 
                    String.Contains(fileName, "wall") && !String.Contains(fileName, "ceiling"))
                {
                    _rockFiles.push(fileObj);
                    return;
                }
        }
        

        if (String.Contains(fileName, "flower"))
        {
            _plantFiles.push(fileObj);
            return;
        }
        else if (String.Contains(fileName, "tree"))
        {
            _treeFiles.push(fileObj);
            return;
        }
        else if (String.Contains(fileName, "roadsign"))
        {
            _otherFiles.push(fileObj);
            return;
        }
        else if (String.Contains(fileName, "road"))
        {
            _rockFiles.push(fileObj);
            return;
        }
        
        _otherFiles.push(fileObj);
    }
}
