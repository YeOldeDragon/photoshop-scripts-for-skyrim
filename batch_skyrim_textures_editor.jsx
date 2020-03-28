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
#include "utilities.jsx"
#include "actions.jsx"
#include "effects.jsx"
#include "folder_parser.jsx"
#include "actor_editor.jsx"
#include "actor_hd_editor.jsx"
#include "default_editor.jsx"
#include "metal_editor.jsx"
#include "normal_map_editor.jsx"
#include "plant_editor.jsx"
#include "rock_editor.jsx"
#include "small_rock_editor.jsx"
#include "tree_editor.jsx"
#include "wood_editor.jsx"


// --------------------------------------------------------------------------------
// BatchSkyrimTexturesEditor class.
// --------------------------------------------------------------------------------
// This class calls the folder parser and mannage what effect to apply to what 
// .dds texture file.
// --------------------------------------------------------------------------------
function BatchSkyrimTexturesEditor()
{
    var _effects = new Effects();    
    var _actions = new Actions();
    var _parser = new FolderParser();

    // --------------------------------------------------------------------------------
    // This method parse the received folder for .dds files
    // and apply the correct effect on them.
    // ------------------------------
    this.ApplyEffectsOnFiles = function(folderPath, dataPath)
    {
        app.preferences.rulerUnits = Units.PIXELS; // Set the ruler units to PIXELS
        app.preferences.typeUnits = TypeUnits.POINTS;   // Set Type units to POINTS

        _parser.Parse(folderPath, dataPath);

        var defaultEditor = new DefaultEditor(_effects, _actions);

        Edit(_parser.ActorFiles, new ActorEditor(_effects, _actions));
        Edit(_parser.ActorHDFiles, new ActorHDEditor(_effects, _actions));
        Edit(_parser.MetalFiles, new MetalEditor(_effects, _actions));
        Edit(_parser.GrassFiles, new PlantEditor(_effects, _actions));
        Edit(_parser.PlantFiles, new PlantEditor(_effects, _actions));
        Edit(_parser.TreeFiles, new TreeEditor(_effects, _actions));
        Edit(_parser.RockFiles, new RockEditor(_effects, _actions));
        Edit(_parser.SmallRockFiles, new SmallRockEditor(_effects, _actions));
        Edit(_parser.WoodFiles, new WoodEditor(_effects, _actions));
        Edit(_parser.LODFiles, defaultEditor);
        Edit(_parser.ClothFiles, defaultEditor);
        Edit(_parser.DecalFiles, defaultEditor);
        Edit(_parser.OtherFiles, defaultEditor);
        Edit(_parser.SnowFiles, defaultEditor);
        Edit(_parser.WeaponFiles, defaultEditor);

        EditNormals(_parser.NormalFiles, new NormalMapEditor(_effects, _actions));
    }

    function Edit(obj, editorObj)
    {
        var i = 0;
        for(i = 0; i < obj.length; i++)
        {
            var doc = open(obj[i]);
            // If file is too small, we skip
            if (doc.width >= 32 || doc.height >= 32) 
            {
                editorObj.PreWork(doc);

                _effects.ApplyDefaultOffset();
                editorObj.ApplyEffect(doc);
                _actions.SelectImageButContour(10);
                _actions.CopySelection();

                _actions.RevertImageToDefault();

                editorObj.ApplyEffect(doc);
                _effects.ApplyDefaultOffset();
                _actions.PasteSelection();
                _actions.SelectAllLayers();
                _actions.AlignSelectedLayers();
                _actions.MergeLayers();
                _effects.RevertDefaultOffset();
                
                editorObj.PostWork(doc);
                doc.save();
            }
            
            doc.close();
        }
    }

    function EditNormals(obj, editorObj)
    {
        var i = 0;
        for(i = 0; i < obj.length; i++)
        {
            var doc = open(obj[i]);
            // If file is too small, we skip
            if (doc.width >= 32 || doc.height >= 32) 
            {
                editorObj.PreWork(doc);

                //_effects.ApplyDefaultOffset();
                //editorObj.ApplyEffect(doc);
                //_actions.SelectImageButContour(10);
                //_actions.CopySelection();

                //_actions.RevertImageToDefault();

                editorObj.ApplyEffect(doc);
                //_effects.ApplyDefaultOffset();
                //_actions.PasteSelection();
                //_actions.SelectAllLayers();
                //_actions.AlignSelectedLayers();
                //_actions.MergeLayers();
                //_effects.RevertDefaultOffset();
                
                editorObj.PostWork(doc);
                doc.save();
            }
            
            doc.close();
        }
    }
}