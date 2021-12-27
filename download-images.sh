for p in $(seq 0 491); do
  echo $p;
  while true; do
    offset=$(($p * 25))
    f="search/before-20210627/${p}.json"
    # curl here
    # curl -v "https://discord.com/api/v9/guilds/" ... > $f
    s=`du -b $f | awk '{print $1}'`
    if [[ "$s" -lt '500' ]]; then
      echo "Retrying after 10s"
      sleep 10
      continue;
    fi
    break
  done
done