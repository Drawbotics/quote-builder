### Data structure

The output of the editor is an object of the following form:

```javascript
tables = [
  {
    // note that these are just labels, the key is named after the "default" usage
    header: {
      phase: string
      service: string
      price: string
    },
    // each object here is a row with the same keys as above, except "comment" which does not have a header
    body: [
      {
        phase: string
        service: string
        comment: string
        price: string
      },
      {
        ...
      },
    ],
    footer: [
      {
        label: string
        comment: string
        value: string
      },
      {
        ...
      },
    ],
  },
]
```
