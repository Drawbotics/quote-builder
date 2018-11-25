# Quote Builder

## Data

### Person (.json)

```bash
{
  id: Int
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
```bash
{
   data: {
     person: PersonType
     project: {
       contactName: String
       companyName: String
       companyLogo: DataURL
       projectName: String
     }
     language: String
     tables: TableType type (defined in app/TableEditor/types)
   }
   sections: {
     cover
     profile [optional]
     howWeWork [optional]
     stats [optional]
     whatWeDo [optional]
     project [optional, multiple]
     storyTelling [optional, multiple]
     products (feeding from table)
     tables (feeding from table)
     paymentMethods (with contact) [optional]
   }
}
```

Since we want to be able to update the person profile even after it has been assigned to a quote, the `profile` section will feed from the people list saved locally. The `data.person` field is updated when the file is saved/exported, so that if someone else is given the file and does not have the profile included, it can be generated from the data in the quote file.

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
  image1: DataURL
  image2: DataURL
  image3: DataURL
  image4: DataURL
  image5: DataURL
  image6: DataURL
}
```
