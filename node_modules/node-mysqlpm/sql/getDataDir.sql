SELECT
  Variable_value AS dataDir
FROM
  INFORMATION_SCHEMA.GLOBAL_VARIABLES
WHERE
  Variable_name = 'datadir'
