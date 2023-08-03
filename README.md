# action-coscli
> Github actions for coscli.

## usgae
```yml
- name: Use coscli
  uses: afeiship/action-coscli@1.0.0
```

## full
```yml
name: gh-action-docker-notes workflow
on: [push]
jobs:
  hello:
    name: hello-docker
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Use coscli
        uses: afeiship/action-coscli@master

      - name: Debug
        run: |
          printenv
          coscli --version
```