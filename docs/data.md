<style type="text/css">
    ol ol { list-style-type: lower-alpha; }
</style>


# Data

### Person (.json)

```bash
{
  id: String
  name: String
  profilePicture: DataURL
  role: String
  quote: String
  descriptions: {
    en: String
    fr: String
    nl: String
  }
  email: String
  mobile: String
  phone: String
  signature: DataURL
}
```

### Quote (.qdp)
__NOTE__: Each `section` has the following shape:
```bash
{
  type: String (e.g. `cover`)
  contents: Object (see below for each example)
}
```
Sections may have no `contents` key, and that means no content is editable and the page will only feed from `data`.


```bash
{
   id: String
   data: {
     person: PersonType
     project: {
       contactName: String
       companyName: String
       companyLogo: DataURL # can be empty
       projectName: String
       billingAddress: String # can be empty
     }
     language: String
     tables: TableType type (defined in app/TableEditor/types)
   }
   sections: [
     cover | no `contents`
     profile [optional] | no `contents`
     howWeWork [optional]
     stats [optional]
     whatWeDo [optional]
     project [optional, multiple]
     storyTelling [optional, multiple]
     products (feeding from table)
     tables (feeding from table) | no `contents`
     paymentMethods (with contact) | no `contents`
   ]
}
```

Since we want to be able to update the person profile even after it has been assigned to a quote, when clicking the profile page the user is given the choice to select a new profile or to get update info of the current one (that is, if a profile with the same ID is found in memory).

__NOTE__: custom products have no icon
__NOTE__: Revo has a custom page and is always first in products

#### How we work
Can be edited:
- Titles
- Descriptions

Each key below is translated by default, if a value is found in any of the keys then it is used instead of the translation. Changing the language of the quote after it has been modified will replace all the texts with default values.
```bash
{
  kickoffTitle: undefined | String
  kickoffDescription: undefined | String
  followupTitle: undefined | String
  followupDescription: undefined | String
  correctionStudioTitle: undefined | String
  correctionStudioDescription: undefined | String
  launchTitle: undefined | String
  launchDescription: undefined | String
}
```

#### Stats
Can be edited:
- Description

```bash
{
  description: undefined | String
}
```

#### What we do
(same as "how we work")
```bash
{
  platformTitle: undefined | String
  platformDescription: undefined | String
  managementTitle: undefined | String
  managementDescription: undefined | String
}
```


#### Project

This is a special section since subsections can be added/removed. It starts with the following template:
```bash
{
  introductionTitle: undefined | String
  introductionDescription: undefined | String
  informationTitle: undefined | String
}
```
After the `informationTitle` section, an unlimited amount of subsection can be added. A filled document may have the following shape
```bash
{
  introductionTitle: "My own introduction"
  introductionDescription: undefined
  informationTitle: undefined
  subsections: [{
    title: "Audience"
    description: "For this project we have two objectives..."
  }, {
    title: "..."
    description: "..."
  }]
}
```


#### Story telling
Can be edited:
- Title
- Description
- Images

```bash
{
  title: undefined | String
  description: undefined | String
  row1: DataURL[]
  row2: DataURL[]
}
```

#### Products
This section feeds from `data.tables` and takes all the products (making sure we have a list of unique ids). However, it also has the `contents` key, but here it is used to write/read overwriting values for the products (for custom services and for different text/image for normal services). For example we may have the following list of services:
```bash
[{
  id: 'exterior3d',
}, {
  id: 'interior3d',
}, {
  id: '1234',
  name: 'A custom brochure',
}]
```
The equivalent default `contents` for this will be:
```bash
...
contents: {
  products: {
    '1234': {
      title: 'A custom brochure',
      image: undefined,
      description: undefined,
    },
  },
}
```
The user then has to set the values of `image` and `description` specially for this product. He or she may also modify those same values for `interior3d`. The new contents then are:
```bash
...
contents: {
  products: {
    '1234': {
      title: 'A custom brochure',
      image: 'base64...',
      description: 'A custom brochure consists of many parts, etc',
    },
    interior3d: {
      image: 'base64...',
      description: 'Our newly updated 3D interiors....',
    },
  },
}
```

## Initial data example
This is what the `qdp` file should look like after bootstrapping the project (blank)
```bash
{
   id: String
   data: {
     person: PersonType
     project: {
       contactName: "Mr John, Mrs May"
       companyName: "My company"
       companyLogo: "base64..."
       projectName: "The coolest project ever"
     }
     language: "EN"
     tables: [
       {
         header: {
           phase: "Phase",
           service: "Service",
           comment: "Comment",
           price: "Price"
         },
         body: [
           {
             phase: "Teasing",
             service: { id: 'exterior3d' },
             comment: "Blablabla",
             price: "€3000"
           },
           {
             phase: "",
             service: { id: 'interior3d' },
             comment: "Blablabla",
             price: "€3000"
           },
           {
             phase: "Teasing",
             service: { id: '2645', name: 'My custom product' },
             comment: "Blablabla",
             price: "€3000"
           }
         ],
         footers: [
           {
             label: "Total",
             comment: "",
             value: "€1.500.000"
           }
         ]
       }
     ]
   }
   sections: [
      {
        type: "cover",
      },
      {
        type: "products",
        contents: {
          products: {
            '2645': {
              title: 'My custom product',
              image: undefined,
              description: undefined,
            },
          },
        },
      },
      {
        type: "tables",
      },
      {
        type: "paymentMethods",
      },
   ],
}
```

## Sequences

### Creating a new file
1. Generate file as described above
2. Save it to a temp file (with `save`) in the app contents. Save it as `untitled-[id].qtp` (id is randomly generated)
3. Navigate to `id/edit` (with the newly generated id)

### Loading a file in `id/edit`
<ol>
  <li>Get the ID from the url</li>
  <li>
    Try to load from temp memory.
    <ol>
      <li>
        If temp file matches id, then load it in state and start editing. Set the page title to "untitled". If user tries to save, prompt with save dialog to give it a name and choose a location. After the first save we delete the temp file from storage.
      </li>
      <li>
        If it doesn't see below.
      </li>
    </ol>
  </li>
  <li>Try to load from disk using the mapping system id => file location.</li>
  <li>
    Load is successful
    <ol>
      <li>If file is found, load it normally. At this stage, autosaving is enabled and will save at correct location (gotten from mapping system)</li>
      <li>If file is not found, show dialog saying the specified file id was not found, redirect to home</li>
    </ol>
  </li>
</ol>

### Loading files in home (`quotes`)
<ol>
  <li>
    Check temp storage for any untitled files (could happen if app crashes while editing and file wasn't saved).
    <ol>
      <li>
        If file is in temp storage, prompt user asking if they want to continue editing or discard the file they were working on.
        <ul>
          <li>If yes, navigate to `id/edit`</li>
          <li>If no, delete file from temp storage</li>
        </ul>
      </li>
      <li>Otherwise, continue</li>
    </ol>
  </li>
  <li>
    Get all files from the mapping system and try to load them from disk.
    <ol>
      <li>If files are missing, prompt user telling them n files are missing (were deleted from computer, or moved).</li>
      <li>
        Ask if they want to re-import them or ignore them.
        <ul>
          <li>If ignored, update the mapping file removing the files not found</li>
          <li>If user wants to re-import, then iterate over each missing file opening a "open" dialog. On each iteration update the mapping file</li>
        </ul>
      </li>
    </ol>
  </li>
</ol>

## File management
We use a basic mapping between files and their location on disk to load them in the homepage of the app. The file looks like the following:
```
{
  '3a1f0404-bd0a-4626-983f-cd6b40181908': '/System/Users/user/Documents/quotes/My quote 1.qdp',
  '10di3jf0-kj93-1hj8-8oih-3kjhfwo83jhf': '/System/Users/user/Downloads/Client-quote-1.qdp',
}
```


## Menu commands
### File
- New quote `CmdOrCtrl+N`
- Import `CmdOrCtrl+O`
- -
- Save `CmdOrCtrl+S`
- Save As `Shift+CmdOrCtrl+S`
- Export as PDF `CmdOrCtrl+E`
- -
- Close file `CmdOrCtrl+W`

If the first two commands and "close file" are called in the `/edit` route, the user is asked if they want to save the current file or they want to discard the changes. If the file is still temporary (untitled), then it will be deleted.

Any file specific command (e.g. save, save as etc) called in routes other than `/edit` it does nothing.

### Edit
Default

### View
Default plus:
- Toggle dark mode/light mode `Shift+CmdOrCtrl+M`


# Known Issues
- `react-pdf` triggers a setState error when reloading the whole document, will need to be monitored as it could be a memory leak
