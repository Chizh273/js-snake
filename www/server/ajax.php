<?php

    require __DIR__ . "/autoload.php";

    if ( isset( $_POST ) && !empty( $_POST ) ) {
        $model = new \App\model\ModelUser();
        foreach ( $_POST as $key => $value ) {
            $model->$key = $value;
        }
        $model->insert();
    } else {
//        var_dump( \App\model\ModelUser::findAll() );
        echo json_encode( \App\model\ModelUser::findAll() );
    }