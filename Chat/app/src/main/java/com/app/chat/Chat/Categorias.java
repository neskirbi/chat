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

public class Categorias extends AppCompatActivity {
    Funciones funciones;
    Context context;
    LinearLayout lista;
    String datacategorias="";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_categorias);
        setTitle("Categorias");
        context=this;
        funciones=new Funciones(context);
        lista=findViewById(R.id.lista);
        datacategorias=funciones.Conexion("",funciones.GetUrl()+getString(R.string.url_GetCategorias));

        try {
            JSONArray jsonArray=new JSONArray(datacategorias);


            for(int i=0;i<jsonArray.length();i++){
                final JSONObject categoriaj=new JSONObject(jsonArray.get(i).toString());
                LayoutInflater inflater = getLayoutInflater();
                View item = inflater.inflate(R.layout.lista, null);
                TextView titulo = item.findViewById(R.id.titulo);
                titulo.setText(categoriaj.get("categoria").toString());
                TextView numero = item.findViewById(R.id.numero);
                numero.setText("("+categoriaj.get("numero").toString()+")");

                item.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {

                        try {
                            startActivity(new Intent(context, Salas.class).putExtra("id_categoria",categoriaj.get("id_categoria").toString()).putExtra("nombre",getIntent().getExtras().get("nombre").toString()));
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
