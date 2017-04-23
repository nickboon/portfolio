param (
    [string] $width = 100
)

$imageJsonDir = "$env:userprofile\Dropbox\Apps\jsonSync\nickboon\json\image"

Set-Location thumbnail
Get-ChildItem -Path $imageJsonDir -Filter *.json -Recurse -File |
 ForEach-Object {
    $jsonPath = $_.FullName
    $url = (Get-Content $jsonPath | Out-String | ConvertFrom-Json).url
    $filename = [System.IO.Path]::GetFileName($url)
	node ../build/thumbnail.js $jsonPath $filename	
    Invoke-WebRequest $url -OutFile $filename
}


if(Test-Path ".\*") 
{

    gm.exe mogrify -size ($width + "x") -resize ($width + "x") -quality 100 *
}

Set-Location ..\


#WIDTH=$1
#  FILES=~/Dropbox/nickboon/json/image/**/*.json
#cd thumbnail
#for FILE in $FILES
#do
#	URL=$(node -pe 'JSON.parse(process.argv[1]).url' "$(cat $FILE)")
#	FILENAME=$(basename $URL)	
#	node ../build/thumbnail.js $FILE $FILENAME	
#	curl -o $FILENAME $URL
#done

#if [ ! -z "$(ls -A .)" ]; then
#  gm mogrify -size "$WIDTH"x -resize "$WIDTH"x -quality 100 *
#fi

