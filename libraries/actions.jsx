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



// --------------------------------------------------------------------------------
// Actions class.
// --------------------------------------------------------------------------------
// This class contains methods to apply photoshop action on the current active 
// document.
// --------------------------------------------------------------------------------
function Actions()
{
    this.SelectImageButContour = function(contourSize)
    {
        var doc = app.activeDocument;

        // =======================================================
        var idsetd = charIDToTypeID( "setd" );
        var desc124 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
        var ref30 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idfsel = charIDToTypeID( "fsel" );
        ref30.putProperty( idChnl, idfsel );
        desc124.putReference( idnull, ref30 );
        var idT = charIDToTypeID( "T   " );
        var desc125 = new ActionDescriptor();
        var idTop = charIDToTypeID( "Top " );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc125.putUnitDouble( idTop, idPxl, contourSize );
        var idLeft = charIDToTypeID( "Left" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc125.putUnitDouble( idLeft, idPxl, contourSize );
        var idBtom = charIDToTypeID( "Btom" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc125.putUnitDouble( idBtom, idPxl, doc.height - contourSize );
        var idRght = charIDToTypeID( "Rght" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc125.putUnitDouble( idRght, idPxl, doc.width - contourSize );
        var idRctn = charIDToTypeID( "Rctn" );
        desc124.putObject( idT, idRctn, desc125 );
        executeAction( idsetd, desc124, DialogModes.NO );
    }

    this.CopySelection = function()
    {
        // =======================================================
        var idcopy = charIDToTypeID( "copy" );
        executeAction( idcopy, undefined, DialogModes.NO );
    }

    this.PasteSelection = function()
    {
        var idpast = charIDToTypeID( "past" );
        var desc147 = new ActionDescriptor();
        var idAntA = charIDToTypeID( "AntA" );
        var idAnnt = charIDToTypeID( "Annt" );
        var idAnno = charIDToTypeID( "Anno" );
        desc147.putEnumerated( idAntA, idAnnt, idAnno );
        var idAs = charIDToTypeID( "As  " );
        var idPxel = charIDToTypeID( "Pxel" );
        desc147.putClass( idAs, idPxel );
        executeAction( idpast, desc147, DialogModes.NO );  
    }

    this.SelectAllLayers = function()
    {
        var idselectAllLayers = stringIDToTypeID( "selectAllLayers" );
        var desc1247 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
        var ref805 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref805.putEnumerated( idLyr, idOrdn, idTrgt );
        desc1247.putReference( idnull, ref805 );
        executeAction( idselectAllLayers, desc1247, DialogModes.NO );
        var idslct = charIDToTypeID( "slct" );
        var desc64 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
        var ref51 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idBckg = charIDToTypeID( "Bckg" );
        ref51.putProperty( idLyr, idBckg );
        desc64.putReference( idnull, ref51 );
        var idselectionModifier = stringIDToTypeID( "selectionModifier" );
        var idselectionModifierType = stringIDToTypeID( "selectionModifierType" );
        var idaddToSelection = stringIDToTypeID( "addToSelection" );
        desc64.putEnumerated( idselectionModifier, idselectionModifierType, idaddToSelection );
        var idMkVs = charIDToTypeID( "MkVs" );
        desc64.putBoolean( idMkVs, false );
        try{
            executeAction( idslct, desc64, DialogModes.NO );
        }catch(e){}
    }

    this.AlignSelectedLayers = function()
    {
        // =======================================================
        var idAlgn = charIDToTypeID( "Algn" );
        var desc323 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
        var ref104 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref104.putEnumerated( idLyr, idOrdn, idTrgt );
        desc323.putReference( idnull, ref104 );
        var idUsng = charIDToTypeID( "Usng" );
        var idADSt = charIDToTypeID( "ADSt" );
        var idADSContent = stringIDToTypeID( "ADSContent" );
        desc323.putEnumerated( idUsng, idADSt, idADSContent );
        var idalignToCanvas = stringIDToTypeID( "alignToCanvas" );
        desc323.putBoolean( idalignToCanvas, false );
        var idAply = charIDToTypeID( "Aply" );
        var idprojection = stringIDToTypeID( "projection" );
        var idAuto = charIDToTypeID( "Auto" );
        desc323.putEnumerated( idAply, idprojection, idAuto );
        var idvignette = stringIDToTypeID( "vignette" );
        desc323.putBoolean( idvignette, false );
        var idradialDistort = stringIDToTypeID( "radialDistort" );
        desc323.putBoolean( idradialDistort, false );
        executeAction( idAlgn, desc323, DialogModes.NO );
    }

    this.MergeDown = function()
    {
        var idMrgtwo = charIDToTypeID( "Mrg2" );
        var desc48 = new ActionDescriptor();
        executeAction( idMrgtwo, desc48, DialogModes.NO );
    }

    this.RevertImageToDefault = function()
    {
        // =======================================================
        var idRvrt = charIDToTypeID( "Rvrt" );
        executeAction( idRvrt, undefined, DialogModes.NO );
    }

    
    this.ResizeIfBiggerThan = function(doc, maxSize)
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


    this.ResizeByPercent = function(doc, percent)
    {
        app.preferences.rulerUnits = Units.PIXELS; // Set the ruler units to PIXELS
        app.preferences.typeUnits = TypeUnits.POINTS;   // Set Type units to POINTS
    
        if (doc.width >= doc.height)
        {
            doc.resizeImage(
                UnitValue(doc.width * percent, 'px'),
                null,
                null,
                ResampleMethod.BICUBIC);
        }
        else
        {
            doc.resizeImage(
                null,
                UnitValue(doc.height * percent, 'px'),
                null,
                ResampleMethod.BICUBIC);
        }
    }
}