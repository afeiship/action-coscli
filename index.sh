#!/usr/bin/env bash
## path:
ROOT_PATH=$(dirname $BASH_SOURCE);

# old
# [ -f /usr/local/etc/bash_completion ] && . /usr/local/etc/bash_completion

[[ -r "/usr/local/etc/profile.d/bash_completion.sh" ]] && . "/usr/local/etc/profile.d/bash_completion.sh"


unset ROOT_PATH;
