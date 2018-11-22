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
     project (customizable text) [optional]
     storyTelling [optional]
     products (by phase/section/whatever, feeding from table)
     tables
     paymentMethods [optional]
     (+ contact info in footer)
   }
}
```

Since we want to be able to update the person profile even after it has been assigned to a quote, the `profile` section will feed from the people list saved locally. The `data.person` field is updated when the file is saved/exported, so that if someone else is given the file and does not have the profile included, it can be generated from the data in the quote file.
