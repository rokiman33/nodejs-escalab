FROM={{from}}
TO={{to}}

if [ ! -f ${FROM} ]; then
    echo "${FROM} is not a file" 1>&2
    exit 1
fi

if [ ! -d ${TO} ]; then
    echo "${TO} is not a directory" 1>&2
    exit 1
fi

cp -pv ${FROM} ${TO}

FILE="${TO}/`basename ${FROM}`"

chown mysql:mysql ${FILE}
chmod 660 ${FILE}
