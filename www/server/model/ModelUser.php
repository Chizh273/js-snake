<?php

    namespace App\model;


    class ModelUser extends \App\classes\AbstractModel
    {
        static public $table = "user";

        static public function getAllColonsName()
        {
            $class = get_called_class();
            $sql = "SELECT `name` FROM `" . static::$table . "` WHERE 1";

            $db = new \App\classes\DB();
            $db->setClassName( $class );
            $res = $db->query( $sql );

            return $res;
        }
    }