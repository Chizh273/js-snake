<?php

    namespace App\classes;


    class AbstractModel
    {
        public $data = [ ];
        static public $table = "";

        public function __get( $name )
        {
            //Implement __get() method.
            return $this->data[ $name ];
        }

        public function __set( $name, $value )
        {
            //Implement __set() method.
            $this->data[ $name ] = $value;
        }

        public function __isset( $name )
        {
            //Implement __isset() method.
            return isset( $this->data[ $name ] );
        }

        static public function findAll()
        {
            $class = get_called_class();
            $sql = "SELECT * FROM `" . static::$table . "` WHERE 1";
            $db = new DB();
            $db->setClassName( $class );
            $res = $db->query( $sql );

            return $res;
        }

        static public function findByColons( $colons, $value )
        {
            $class = get_called_class();
            $sql = "SELECT * FROM `" . static::$table . "` WHERE " . $colons . "=" . $value;
            $db = new DB();
            $db->setClassName( $class );
            $params = [ ":" . $colons => $value ];
            $res = $db->query( $sql, $params );

            return $res;
        }

        public function insert()
        {
            $params = [ ];
            foreach ( $this->data as $key => $value ) {
                $params[ ":" . $key ] = $value;
            }
            $sql = 'INSERT INTO `' . static::$table . '`
                    (`' . implode( "`, `", array_keys( $this->data ) ) . '`)
                    VALUES
                    (' . implode( ", ", array_keys( $params ) ) . ')';
            $db = new DB();
            $db->execute( $sql, $params );
            $this->id = $db->lastInsertId();
        }
    }