Grafana Repository Attic
====

This repository contains the history for old repositores that are no longer useful.

To add a repository run:

```
git remote add -f {repo-name} git@github.com:grafana/{repo-name}.git
git merge {repo-name}/master --allow-unrelated-histories
mkdir {repo-name}
mv * {repo-name}
```
Then move any existing folders back to root and move any hidden files (.gitignore etc) to `{repo-name}`

this README.md will conflict