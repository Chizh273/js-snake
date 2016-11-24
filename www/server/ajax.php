<?php

    require __DIR__ . "/autoload.php";

    if ( $_POST['action'] === "name" ) {
        echo json_encode( \App\model\ModelUser::getAllColonsName() );
    } else if ( isset( $_POST ) && !empty( $_POST ) ) {
        $model = new \App\model\ModelUser();
        foreach ( $_POST as $key => $value ) {
            $model->$key = $value;
        }
        $model->insert();
    } else {
        echo json_encode( \App\model\ModelUser::findAll() );
    }
