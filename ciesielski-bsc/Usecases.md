Use Case 1:             Loading a supported file and displaying the structure.
Use Case Overview:  1   User clicks on "Select File" button or selects "File" -> "Select File" in the menu bar.
                    2   User picks a supported file.
                    3   File structure is displayed to the user in the viewer and the button layout changes.

Extensions:         2a  User picks a not supported file.
                        Nothing will be displayed. Functionality remains intact. User must start over from Step 1.

Use Case 2:             Loading a PDB file by ID from an online database.
Use Case Overview:  1   User clicks on "Load PDB by ID" button or selects "File" -> "Load PDB by ID" in the menu bar.
                    2   "Enter PDB here" input box appears. User types in a valid PDB ID and presses Enter.
                    3   PDB file structure is displayed to the user in the viewer and the button layout changes.

Extensions:         2a  User types in a not valid PDB ID.
                        A popup window appears informing the user of the invalidity. Nothing is displayed. User must start over from Step 1.

Use Case 3:             Downloading a PDB file by ID from an online database.
Use Case Overview:  1   User clicks on "Load PDB by ID" button or selects "File" -> "Load PDB by ID" in the menu bar.
                    2   "Enter PDB here" input box appears. User types in a valid PDB ID and presses Ctrl and Enter simultaneously.
                    3a  If corresponding PDB file does not exist yet in the current directory, it is downloaded.
                    3b  If corresponding PDB file does exist in the current directory, nothing is downloaded.
                    4   A popup window appears informing the user that the file exists. User is asked if the structure should be displayed.
                    5a  If user clicks on "Yes" button, the popup window closes and Use Case 2 starts from step 3.
                    5b  If user clicks on "No" button, the popup window closes and nothing is displayed.

Extensions:         2a  User types in a not valid PDB ID.
                        A popup window appears informing the user of the invalidity. Nothing is downloaded. User must start over from Step 1.

Use Case 4:             Changing the model type for the displayed PDB structure.
Use Case Overview:  1a  User follows Use Case 1 and selects a ".pdb" file.
                    1b  User follows Use Case 2.
                    1c  User follows Use Case 3, including step 5a.
                    2   Menu with available model variations appears. Initially set to "Balls and Sticks".
                    3   User clicks on the model menu.
                    4   The displayed structure changes according to the user's selection in the menu.

Extensions:         1aa User follows Use Case 1 but selects a different file than a ".pdb" file.
                        Use Case 1 continues from step 3 without a model menu appearing.

Use Case 5:             Resetting the camera position for the displayed structure.
Use Case Overview:  1   User follows Use Case 1, 2 or 3 and views a displayed structure.
                    2   User clicks on "Reset Camera" button or selects "View" -> "Reset Camera" in the menu bar.
                    3   The camera position for the displayed structure changes to its initial position.

Extensions:             /

Use Case 6:             Resetting the application to its original state.
Use Case Overview:  1   User follows Use Case 1, 2 or 3 and views a displayed structure.
                    2   User clicks on "Reset Viewer" button or selects "View" -> "Reset Viewer" in the menu bar.
                    3   The currently displayed structure is removed from the viewer and the button layout changes to its initial state.

Extensions:             /

Use Case 7:             Closing the application.
Use Case Overview:  1   User clicks on "Exit" button or selects "File" -> "Exit" in the menu bar.
                    2   The window closes and the application shuts down.

Extensions:             /

Use Case 8:             Changing the window's size.
Use Case Overview:  1   User selects "Window" -> "Change Window Size" in the menu bar.
                    2   A selection of percentages reaching from 10% to 100% appears.
                    3   User selects one of the percentages and the window's size changes to the selected percentage of the user's screen size.

Extensions:             /

Use Case 9:             Toggling the window's fullscreen mode.
Use Case Overview:  1   User selects "Window" -> "Toggle Fullscreen" in the menu bar.
                    2a  If the window is currently in fullscreen mode, it exits fullscreen mode.
                    2b  If the window is not currently in fullscreen mode, it enters fullscreen mode.

Extensions:             /

Use Case 10:            Opening a Julia shell.
Use Case Overview:  1   User selects "Debug" -> "Open Julia REPL" in the menu bar.
                    2   The Julia REPL opens up in a separate window.
                    
Extensions:             /

Use Case 11:            Toggling the application's web developer tools for debugging purposes.
Use Case Overview:  1   User selects "Debug" -> "Toggle DevTools" in the menu bar.
                    2   The application's web developer tools open up on the right-hand side of the window.

Extensions:             /
