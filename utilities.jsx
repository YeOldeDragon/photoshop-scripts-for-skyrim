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

// ********************************************************
// Check if the array contains a specific value.
Array.Contains = function(obj, value)
{
    var i = 0;
    for(i = 0; i < obj.length; i++)
    {
        if (obj[i] == value) return true;
    }
    return false;
}


// ********************************************************
// Execute a callback function for every item in the array.
Array.ForEach = function(obj, callback)
{
    var i = 0;
    for(i = 0; i < obj.length; i++)
    {
        callback(obj[i]);
    }
}


// ********************************************************
// Check if a string contains a specific substring.
String.Contains = function (obj, value)
{
    return obj.indexOf(value) >= 0;
}