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



// --------------------------------------------------------------------------------
// Effects class.
// --------------------------------------------------------------------------------
// This class contains methods to apply photoshop effects on the current active 
// document.
// --------------------------------------------------------------------------------
function Effects()
{
    // Public method to apply a strong Oil Paint effect.
    this.ApplyStrongOilPaint = function(strongness)
    {
        for(i = 0; i < strongness; i++)
        {
            ApplyOilPaint(5.0, 5.0);
        }
    }

    // Public method to apply a light Oil Paint effect.
    this.ApplyLightOilPaint = function(strongness)
    {
        for(i = 0; i < strongness; i++)
        {
            ApplyOilPaint(3.5, 2.5);
        }
    }

    // Apply a Oil Paint effect on active document.
    function ApplyOilPaint(stylization, cleanliness)
    {
        var desc = new ActionDescriptor();

        // Form
        desc.putBoolean(stringIDToTypeID("lightingOn"), false);
        desc.putDouble(stringIDToTypeID("stylization"), stylization);
        desc.putDouble(stringIDToTypeID("cleanliness"), cleanliness);
        desc.putDouble(stringIDToTypeID("brushScale"), 10.000000);
        desc.putDouble(stringIDToTypeID("microBrush"), 10.000000);
        
        // Lightning
        desc.putDouble(stringIDToTypeID("specularity"), 1.300000);
        desc.putInteger(charIDToTypeID("LghD"), -60);

        // execute...
        executeAction(stringIDToTypeID("oilPaint"), desc, DialogModes.NO);
    }


    // Public method to apply a 200 x 200 offset to image
    this.ApplyDefaultOffset = function()
    {
        ApplyOffset(200, 200);
    }


    // Public method to apply a -200 x -200 offset to image.
    this.RevertDefaultOffset = function()
    {
        ApplyOffset(-200, -200);
    }


    function ApplyOffset(offsetHrzn, offsetVrtc)
    {
        // =======================================================
        var idOfst = charIDToTypeID( "Ofst" );
        var desc118 = new ActionDescriptor();
        var idHrzn = charIDToTypeID( "Hrzn" );
        desc118.putInteger( idHrzn, offsetHrzn );
        var idVrtc = charIDToTypeID( "Vrtc" );
        desc118.putInteger( idVrtc, offsetVrtc );
        var idFl = charIDToTypeID( "Fl  " );
        var idFlMd = charIDToTypeID( "FlMd" );
        var idWrp = charIDToTypeID( "Wrp " );
        desc118.putEnumerated( idFl, idFlMd, idWrp );
        executeAction( idOfst, desc118, DialogModes.NO );
    }
}