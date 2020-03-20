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
#include "folder_parser.jsx"
#include "effects.jsx"


// --------------------------------------------------------------------------------
// BatchSkyrimTexturesEditor class.
// --------------------------------------------------------------------------------
// This class calls the folder parser and mannage what effect to apply to what 
// .dds texture file.
// --------------------------------------------------------------------------------
function BatchSkyrimTexturesEditor()
{
    var _effects = new Effects();
    var _parser = new FolderParser();

    // --------------------------------------------------------------------------------
    // This method parse the received folder for .dds files
    // and apply the correct effect on them.
    // ------------------------------
    this.ApplyEffectsOnFiles = function(folderUri)
    {
        app.preferences.rulerUnits = Units.PIXELS; // Set the ruler units to PIXELS
        app.preferences.typeUnits = TypeUnits.POINTS;   // Set Type units to POINTS

        _parser.Parse(folderUri);

        Array.ForEach(_parser.PlantFiles, EditPlant);
        Array.ForEach(_parser.GrassFiles, EditGrass);
        Array.ForEach(_parser.TreeFiles, EditTree);
        Array.ForEach(_parser.LODFiles, EditOthers);
        Array.ForEach(_parser.ClothFiles, EditOthers);
        Array.ForEach(_parser.DecalFiles, EditOthers);
        Array.ForEach(_parser.RockFiles, EditRock);
        Array.ForEach(_parser.OtherFiles, EditOthers);
    }


    // --------------------------------------------------------------------------------
    // Apply effect on uncategorized textures
    // ------------------------------
    function EditOthers(fileObj)
    {
        var doc = open(fileObj);
        // On skip les fichiers trop petits.
        if (doc.width < 32 && doc.height < 32) 
        {
            doc.close();
            return;
        }

        _effects.ApplyLightOilPaint(1);
        doc.save();
        doc.close();
    }

    // --------------------------------------------------------------------------------
    // Apply effect on grass textures
    // ------------------------------
    function EditGrass(fileObj)
    {
        var doc = open(fileObj);
        // On skip les fichiers trop petits.
        if (doc.width < 32 && doc.height < 32) 
        {
            doc.close();
            return;
        }
        var strongness = 1;
        
        if(doc.height > 1024 || doc.width > 1024) {
            strongness = 4;
        }

        _effects.ApplyLightOilPaint(strongness);
        doc.save();
        doc.close();
    }

    // --------------------------------------------------------------------------------
    // Apply effect on plant textures
    // ------------------------------
    function EditPlant(fileObj)
    {
        var doc = open(fileObj);
        // On skip les fichiers trop petits.
        if (doc.width < 32 && doc.height < 32) 
        {
            doc.close();
            return;
        }
        var strongness = 1;
        
        if(doc.height > 1024 || doc.width > 1024) {
            strongness = 4;
        }

        _effects.ApplyLightOilPaint(strongness);
        doc.save();
        doc.close();
    }


    // --------------------------------------------------------------------------------
    // Apply effect on Tree textures
    // ------------------------------
    function EditTree(fileObj)
    {
        var doc = open(fileObj);
        // On skip les fichiers trop petits.
        if (doc.width < 32 && doc.height < 32) 
        {
            doc.close();
            return;
        }
        var strongness = 1;
        
        if(String.Contains(fileObj.name, "bark") && (doc.height >= 2048 || doc.width >= 2048)) {
            strongness = 4;
        }

        _effects.ApplyLightOilPaint(strongness);
        doc.save();
        doc.close();
    }


    // --------------------------------------------------------------------------------
    // Apply effect on rock textures
    // ------------------------------
    function EditRock(fileObj)
    {
        var doc = open(fileObj);    
        // On skip les fichiers trop petits.
        if (doc.width < 32 && doc.height < 32) 
        {
            doc.close();
            return;
        }  

        ResizeIfBiggerThan(doc, 2048);

        if((doc.width >= 1024 && doc.height > 256) ||
           (doc.height >= 1024 && doc.width > 256))
        {
            _effects.ApplyStrongOilPaint(4);
        }
        else
        {
            _effects.ApplyLightOilPaint(4);
        }

        doc.save();
        doc.close();
    }

    // --------------------------------------------------------------------------------
    // Resize the file "doc" if it size is bigger than the maxSize value.
    // ------------------------------
    function ResizeIfBiggerThan(doc, maxSize)
    {
        app.preferences.rulerUnits = Units.PIXELS; // Set the ruler units to PIXELS
        app.preferences.typeUnits = TypeUnits.POINTS;   // Set Type units to POINTS

        if (doc.width >= doc.height)
        {
            if(doc.width > maxSize) {
                doc.resizeImage(
                    UnitValue(maxSize, 'px'),
                    null,
                    null,
                    ResampleMethod.BICUBIC);
            }
        }
        else
        {
            if(doc.height > maxSize) {
                doc.resizeImage(
                    null,
                    UnitValue(maxSize, 'px'),
                    null,
                    ResampleMethod.BICUBIC);
            }
        }
    }
}