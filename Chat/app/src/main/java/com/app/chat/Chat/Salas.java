package com.app.chat.Chat;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.app.chat.Funciones;
import com.app.chat.R;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Salas extends AppCompatActivity {
    Funciones funciones;
    Context context;
    LinearLayout lista;
    String datasalas="";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_salas);
        setTitle("Salas");
        context=this;
        funciones=new Funciones(context);
        String id_categoria=getIntent().getExtras().getString("id_categoria");
        lista=findViewById(R.id.lista);
        datasalas=funciones.Conexion("{\"id_categoria\":\""+id_categoria+"\"}",funciones.GetUrl()+getString(R.string.url_GetSalas));

        try {
            JSONArray jsonArray=new JSONArray(datasalas);


            for(int i=0;i<jsonArray.length();i++){
                final JSONObject salasj=new JSONObject(jsonArray.get(i).toString());
                LayoutInflater inflater = getLayoutInflater();
                View item = inflater.inflate(R.layout.lista, null);
                TextView titulo = item.findViewById(R.id.titulo);
                titulo.setText(salasj.get("sala").toString());
                item.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        try {
                            startActivity(new Intent(context, ChatWindow.class).putExtra("id_sala",salasj.get("id_sala").toString()).putExtra("titulo",salasj.get("sala").toString()).putExtra("nombre",getIntent().getExtras().get("nombre").toString()));
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                });
                lista.addView(item,i);
            }

        }catch (Exception e){
            funciones.Logo("Error",e.getMessage());
        }


        AdView m = findViewById(R.id.banner);
        AdRequest adRequest = null;
        adRequest=new AdRequest.Builder().build();
        m.loadAd(adRequest);

    }



}