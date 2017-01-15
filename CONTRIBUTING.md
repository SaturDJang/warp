# How to contribute to Warp

## Commit message formats
- Commit title must be started with **uppercase letter**. (e.g. `Fix type errors ...`)
- Length of title cannot be over **50 letters**. (Editor like vim checks lengths.)
- Commit description must follow below format.
    ```
        (#issue number) TITLE
    
        A SHORT SUMMARY
    
        1. DETAIL DESCRIPTION
        2. 
        3.
    ``` 
- The commit which has a simple change can have only title.

## Contributing rules
- We are only using **GitHub pull request** for receiving your contribution.
- The contributing can be merged when has one approved review at least.

## Branching rules
- You must not create commit to `master` branch.
- Do your branch direct specific issue?
    - Branch name must follow this format `{issue_number}-{title}`
- Do your branch created for hoxfix situation? (Fix doc. or misspells)
    - Branch name: `{hotfix}/{title}`
