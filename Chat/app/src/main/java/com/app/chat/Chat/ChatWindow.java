package com.app.chat.Chat;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.media.MediaPlayer;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import com.app.chat.Funciones;
import com.app.chat.R;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Executor;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class ChatWindow extends AppCompatActivity {
    Intent intent;
    String id_sala,nombre="",fecha="";
    TextView titulo;
    EditText mensaje;
    LinearLayout chat;
    ScrollView scroll;
    Funciones funciones;
    Context context;
    boolean bandera = true;
    MediaPlayer mPlayer = new  MediaPlayer();
    int corePoolSize = 60;
    int maximumPoolSize = 80;
    int keepAliveTime = 10;

    BlockingQueue<Runnable> workQueue = new LinkedBlockingQueue<Runnable>(maximumPoolSize);
    Executor threadPoolExecutor = new ThreadPoolExecutor(corePoolSize, maximumPoolSize, keepAliveTime, TimeUnit.SECONDS, workQueue);
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_window);
        intent=getIntent();
        id_sala=intent.getExtras().get("id_sala").toString();
        titulo=findViewById(R.id.titulo);
        mensaje=findViewById(R.id.mensaje);
        chat=findViewById(R.id.chat);
        scroll=findViewById(R.id.scroll);
        titulo.setText(intent.getExtras().get("titulo").toString());
        context=this;
        funciones=new Funciones(context);
        nombre = getIntent().getExtras().get("nombre").toString();


        AdView m = findViewById(R.id.banner);
        AdRequest adRequest = null;
        adRequest=new AdRequest.Builder().build();
        m.loadAd(adRequest);


        Recibiendo recibiendo=new Recibiendo();
        recibiendo.executeOnExecutor(threadPoolExecutor);
    }

    public void  Enviar(View view){
        funciones.Vibrar(funciones.VibrarPush());

        if(mensaje.getText().toString().replace(" ","").length()!=0){
            Enviando enviando=new Enviando();
            enviando.executeOnExecutor(threadPoolExecutor);
        }

    }

    class Enviando extends AsyncTask {
        @Override
        protected void onProgressUpdate(Object[] values) {
            super.onProgressUpdate(values);
            mensaje.setText("");
        }

        @Override
        protected Object doInBackground(Object[] objects) {
            String respuesta="";
            respuesta=funciones.Conexion("{\"id_sala\":\""+id_sala+"\",\"id_usuario\":\""+funciones.GetID()+"\",\"nombre\":\""+funciones.ToBase64(nombre)+"\",\"mensaje\":\""+funciones.ToBase64(mensaje.getText().toString())+"\",\"tipo\":\"1\"}",funciones.GetUrl()+getString(R.string.url_SetChat));
            if(respuesta.contains("respuesta") && respuesta.contains("1")){
                publishProgress("");
            }

            return null;
        }
    }

    class Recibiendo extends AsyncTask {
        @Override
        protected void onProgressUpdate(Object[] values) {
            super.onProgressUpdate(values);
            try {
                JSONArray jsonArray=new JSONArray(values[0].toString());
                for(int i =0 ; i<jsonArray.length();i++){
                    JSONObject jsonObject=new JSONObject(jsonArray.get(i).toString());
                    fecha=jsonObject.get("fecha").toString();

                    LayoutInflater inflater = getLayoutInflater();
                    View item ;
                    if(!funciones.GetID().contains(jsonObject.get("id_usuario").toString())){
                        item=inflater.inflate(R.layout.dialogo1, null);
                    }else{
                        item=inflater.inflate(R.layout.dialogo2, null);
                    }

                    TextView nombre = item.findViewById(R.id.nombre);
                    nombre.setText(funciones.BaseToString(jsonObject.get("nombre").toString())+":   ");

                    TextView mensaje = item.findViewById(R.id.mensaje);
                    mensaje.setText(funciones.BaseToString(jsonObject.get("mensaje").toString()));

                    TextView hora = item.findViewById(R.id.hora);
                    hora.setText(jsonObject.get("hora").toString());



                    chat.addView(item);
                    mPlayer.reset();
                    mPlayer = MediaPlayer.create(context, R.raw.pop);
                    mPlayer.start();
                    scroll.post(new Runnable() {
                        @Override
                        public void run() {
                            scroll.fullScroll(ScrollView.FOCUS_DOWN);
                        }
                    });
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }

        }

        @Override
        protected Object doInBackground(Object[] objects) {
            String respuesta="";
            while(bandera){
                respuesta=funciones.Conexion("{\"id_usuario\":\""+funciones.GetID()+"\",\"usuario\":\""+funciones.ToBase64(nombre)+"\",\"id_sala\":\""+id_sala+"\",\"fecha\":\""+fecha+"\"}",funciones.GetUrl()+getString(R.string.url_GetChat));
                publishProgress(respuesta);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            return null;
        }
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        bandera =false;
        finish();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

    }
}
