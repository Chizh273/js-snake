<?php

    namespace App\classes;


    class DB
    {
        private $dbh;
        private $className = "stdClass";

        public function __construct()
        {
            $arr = parse_ini_file( __DIR__ . "/../config/config_DB.ini" );

            $dsn = $arr['driver'] . ":dbname=" . $arr['db'] . ";host=" . $arr['host'];

            $this->dbh = new \PDO( $dsn, $arr["user"], $arr["pass"] );
            $this->dbh->setAttribute( \PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION );
        }

        public function setClassName( $class )
        {
            $this->className = $class;
        }

        public function query( $sql, $params = [ ] )
        {
            $sth = $this->dbh->prepare( $sql );
            $res = $sth->execute( $params );

            return $sth->fetchAll( \PDO::FETCH_CLASS, $this->className );
        }

        public function execute( $sql, $params = [ ] )
        {
            $sth = $this->dbh->prepare( $sql );
            $res = $sth->execute( $params );

            return $res;
        }

        public function lastInsertId()
        {
            return $this->dbh->lastInsertId();
        }
    }
