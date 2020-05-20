package com.app.chat.Sqlite;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class Base extends SQLiteOpenHelper {

    private static  String LOGIN_TABLE_CREATE= "",GRUPO_TABLE_CREATE= "",CHAT_TABLE_CREATE= "",CHAT_IN_TABLE_CREATE="";
    private static  String DB_NAME = "chat.sqlite";
    private static  int DB_VERSION = 1;
    public Base(Context context) {
        super(context, DB_NAME, null, DB_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {


        LOGIN_TABLE_CREATE= "CREATE TABLE IF NOT EXISTS  usuarios(" +
                "id_usuario TEXT PRIMARY KEY NOT NULL," +
                "usuario TEXT NOT NULL)" ;

        GRUPO_TABLE_CREATE= "CREATE TABLE IF NOT EXISTS  grupo(" +
                "id_grupo TEXT PRIMARY KEY NOT NULL," +
                "grupo TEXT NOT NULL," +
                "fecha TEXT not null)" ;

        CHAT_TABLE_CREATE= "CREATE TABLE IF NOT EXISTS  mensajes(" +
                "id_mensaje TEXT PRIMARY KEY NOT NULL," +
                "mensaje TEXT NOT NULL," +
                "enviado TEXT NOT NULL)" ;


        CHAT_IN_TABLE_CREATE= "CREATE TABLE IF NOT EXISTS  mensajes_in(" +
                "id_mensaje TEXT PRIMARY KEY NOT NULL," +
                "id_usuario TEXT NOT NULL," +
                "nombre TEXT NOT NULL," +
                "mensaje TEXT NOT NULL," +
                "tipo TEXT NOT NULL," +
                "fecha DATETIME NOT NULL)" ;


        db.execSQL(LOGIN_TABLE_CREATE);
        db.execSQL(GRUPO_TABLE_CREATE);
        db.execSQL(CHAT_TABLE_CREATE);
        db.execSQL(CHAT_IN_TABLE_CREATE);


    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }
}
