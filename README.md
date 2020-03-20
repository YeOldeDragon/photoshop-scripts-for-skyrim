# photoshop-scripts-for-skyrim
Photoshop batch scripts for Skyrim .dds texture editing. 

## Description
I've created these scripts to apply some Oil Paint effect on all the Skyrim SE default textures.
It parses a folder (and all subfolders) to get all .dds textures to edit.  
Files are (kind of) categorized and a different effect will be applied on each texture category.
  
By default, it skips files located in these folders: `"cubemaps", "effects", "shadertests", "sky", "terrain", "interface", "test", "water", "character"`.  
It also skips files with theses values in names: `"_n", "_g", "_em", "_m"`.
You can change these values in `folder_parser.jsx` script.  
  
File categories are: `plant, grass, tree, LOD, cloth, impactdecal, rock and other`.  
You can change Photoshop actions that are applied on files in `batch_skyrim_textures_editor.jsx` script.
  
I've uploaded these scripts here to give an example on how you can batch-edit .dds files using Photoshop and the Intel-Texture-Works-Plugin (.dds plugin for Photoshop).  
I've also uploaded a [Intel-Texture-Works-Plugin version](https://github.com/YeOldeDragon/Intel-Texture-Works-Plugin) that automatically uses my default file options when opening and saving .dds files.


## Getting Started (Installation)
1. Close Photoshop
2. Download the IntelTextureWorks_1.0.4.zip file and expand it on your local computer
3. Copy the desired plugin from either of the following unzipped folders
	* .../IntelTextureWorks_1.0.4\Plugins\x64\IntelTextureWorks.8bi
	* .../IntelTextureWorks_1.0.4\Plugins\Win32\IntelTextureWorks.8bi
4. Paste the plugin into the appropriate Photoshop Plugin folder
	* D:\Program Files\Adobe Photoshop CC 2014\Required\Plug-Ins\File Formats
	* D:\Program Files\Adobe\Adobe Photoshop CS6 (64 Bit)\Plug-ins\File Formats
  
5. Download the photoshop-scripts-for-skyrim files and place them on your local computer
6. Start Photoshop
7. Execute the _start.jsx script (menu File -> Scripts... -> Browse...).
  * When asked, select the Skyrim texture folder you want to edit.
  * Wait until Photoshop has finished the batch process (it can takes a long time, it depends on how many textures you want to edit).


