#!/bin/bash
echo Updating translations template...
find -name '*.php' -o -name '*.inc.php' > translations_files.txt
xgettext -f translations_files.txt --from-code utf-8 -o hacklol-modifier-translations.pot
echo Done !
read -p "Launch Poedit ? (o/n) " launch
    if [ "$launch" == "o" ] || [ "$launch" == "y" ] || [ "$launch" == "oui" ] || [ "$launch" == "yes" ]; then
        echo Launching Poedit...
        poedit $PWD"/locale/en_US/LC_MESSAGES/default.po"
    fi
