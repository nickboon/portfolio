WIDTH=$1
FILES=~/Dropbox/nickboon/json/image/**/*.json
cd thumbnail
for FILE in $FILES
do
	URL=$(node -pe 'JSON.parse(process.argv[1]).url' "$(cat $FILE)")
	FILENAME=$(basename $URL)	
	node ../build/thumbnail.js $FILE $FILENAME	
	curl -o $FILENAME $URL
done

if [ ! -z "$(ls -A .)" ]; then
  gm mogrify -size "$WIDTH"x -resize "$WIDTH"x -quality 100 *
fi
