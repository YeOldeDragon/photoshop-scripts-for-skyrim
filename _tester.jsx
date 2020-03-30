/*
<javascriptresource>
<enableinfo>false</enableinfo>
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
#include "effects.jsx"
#include "actions.jsx"

//var doc = app.activeDocument;
var _basePath = "~/Desktop/textures/";
var _destPath = "C:/Users/marcel/Desktop/result/";
var filePath = "C:/Users/marcel/Desktop/textures/architecture/whiterun/wrbasedirt01.dds";
//var treePath = filePath.replace(basePath, "");
var tmp =  new File(filePath);
var treePath = tmp.path.replace(_basePath, ""); 

var folderObj = new Folder(_destPath + treePath);
if (!folderObj.exist)
{
    folderObj.create();
}
alert(folderObj);

alert(tmp.copy(_destPath + treePath + "/" + tmp.name));
open(new File(_destPath + treePath + "/" + tmp.name));
//alert(_destPath + treePath);


//doc.saveAs(File(_destPath + treePath + "/" + doc.name), null, true);



// var _effects = new Effects();
// var _actions = new Actions();



// _effects.ApplyDefaultOffset();
// _effects.ApplyStrongOilPaint(1);
// _actions.SelectImageButContour(10);
// _actions.CopySelection();

// _actions.RevertImageToDefault();

// _effects.ApplyStrongOilPaint(1);
// _effects.ApplyDefaultOffset();
// _actions.PasteSelection();
// _actions.SelectAllLayers();
// _actions.AlignSelectedLayers();
// _actions.MergeLayers();
// _effects.RevertDefaultOffset();