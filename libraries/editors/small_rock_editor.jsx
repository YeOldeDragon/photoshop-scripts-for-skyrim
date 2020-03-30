/*
<javascriptresource>
<enableinfo>false</enableinfo>
</javascriptresource>
*/
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


function SmallRockEditor(effectsObj, actionsObj, maxSize)
{
    var _maxSize = maxSize;
    var _effects = effectsObj;
    var _actions = actionsObj;

    // Actions we want to do before applying effects (ex.: resize)
    this.PreWork = function(doc)
    {
        _actions.ResizeIfBiggerThan(doc, 2048);
    }


    // Actions / effects we want to apply to this image type
    this.ApplyEffect = function(doc)
    {
        _effects.ApplyLightOilPaint(2);
    }

    
    // Actions we want to do before applying effects (ex.: resize)
    this.PostWork = function(doc)
    {
        _actions.ResizeIfBiggerThan(doc, _maxSize);
    }
}