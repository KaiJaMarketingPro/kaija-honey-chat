mkdir -p public
mv test.html public/
mv *.html public/
git add public/*.html
git commit -m "fix: re-add public html files for Vercel routing"
git push
