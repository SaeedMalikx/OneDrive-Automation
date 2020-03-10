

# OneDrive Automation
gif included for the inevitable "It runs on my computer"
![](testrunfinal.gif)

## Installation

Install the required libraries:

```
npm install
```

1. replace the path in test.js for "downloadPath" to where chrome downloads as in "C:/Users/your username/Downloads/one.txt"


Finally run the test suite

```
npm test
```

To see the report open the html located in mochawesome-report folder (mochawesome.html)



## Tools Used

Kept to a minimum on purpose

- Selenium Web Driver (V: 4.0.0-alpha.7) (https://www.npmjs.com/package/selenium-webdriver)
- Mocha (V: 7.1.0) (https://www.npmjs.com/package/mocha) Javascript testing suite
- Mocha-awesome (V: 5.0.0) (https://www.npmjs.com/package/mochawesome) For generating reports via mocha

Uses latest node.js
No compilers used, just base javascript


## Test Layout

- [x] Succesfully logs into OneDrive using the credentials provided

    Verifies the title of the dashboard for onedrive. Successfull login should take you the main dashboard for onedrive

- [x] 0 Byte .txt file upload and subsequent failure

    Verifies by checking the status of the upload. Upload monitor provides an error if the file is 0 Byte.

- [x] 1 Byte .txt file upload

    Verifies by checking the status of the upload. Upload monitor provides a confirmation upon a succesfull upload.
    Alternative verification would be whether the file exists on OneDrive

- [x] Check Metadata of the uploaded file

    Verifies by checking the metadata. Choose the file size as its expected to be a certain size within a empty OneDrive.

- [x] Reupload 1 Byte .txt file and subsequent failure

    Verify by checking the status of the upload. Upload monitor provides an error if the file already exists.

- [x] Download the original version and verify

    Verify by checking the contents of the file after downloading. The contents to be expected are already known. 


- [x] Open and Edit The Uploaded File and save it

    Verify by checking the contents of the file after editing

- [x] Download the new edited version and verify

    Verify by checking the contents of the file after downloading. The contents to be expected are already known. Assert that it does not equal already downloaded original version.

- [x] Delete the uploaded file from OneDrive

    Verify by checking the status monitor. Status monitor provides a confirmation for deletion. Alternative is check whether the file exists in OneDrive


## Expanding the existing framework

The current structure is based on page object model so this could easily be adapted to include the whole site but some changes might be required such as

- Having a dedicated class for initializing the selenium builder with settings, currently it is just basic version
- Refactoring out the dashboard.js to include individual components of the dashboard itself such as navigation bar, file selected menubar. 
- Expanding the mocha test layouts to bigger suites