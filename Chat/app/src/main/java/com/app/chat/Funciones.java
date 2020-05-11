package com.app.chat;

import android.content.Context;
import android.os.StrictMode;
import android.util.Log;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.UUID;

public class Funciones {
    Context context;
    public Funciones(Context context) {
        this.context = context;
    }


    public String GetUIID(){
        return UUID.randomUUID().toString().replace("-","");
    }

    public String GetUrl(){
        String URL="";
        URL=context.getString(R.string.url);
        return URL;
    }

    public String Conexion(String data, String url) {
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        String result = "";


        try {

            Logo("Conexion","Enviando: " + url + "    " + data);

            //Create a URL object holding our url
            URL myUrl = new URL(url);
            //Create a connection
            HttpURLConnection connection = (HttpURLConnection) myUrl.openConnection();
            //Set methods and timeouts
            connection.setRequestMethod("POST");
            connection.setReadTimeout(5000);
            connection.setConnectTimeout(5000);
            //connection.addRequestProperty("pr","33");

            //Connect to our url
            connection.connect();


            OutputStream os = connection.getOutputStream();
            BufferedWriter writer = new BufferedWriter(
                    new OutputStreamWriter(os, "UTF-8"));
            writer.write("data=" + data);

            writer.flush();
            writer.close();
            os.close();


            //Create a new InputStreamReader

            InputStreamReader streamReader = new
                    InputStreamReader(connection.getInputStream());

            //Create a new buffered reader and String Builder
            BufferedReader reader = new BufferedReader(streamReader);
            StringBuilder stringBuilder = new StringBuilder();

            //stringBuilder.append(data);

            //Check if the line we are reading is not null
            String inputLine;
            while ((inputLine = reader.readLine()) != null) {
                stringBuilder.append(inputLine);
            }
            //Close our InputStream and Buffered reader
            reader.close();
            streamReader.close();
            //Set our result equal to our stringBuilder
            result = stringBuilder.toString();
            Logo("Conexion", "Recibiendo: " + result);
            return result;


        } catch (Exception ee) {
            Logo("Conexion", "Error_conexion: " + ee.getMessage());
            return "[]";
        }


    }

    public void Logo(String tag,String men)
    {
        if(BuildConfig.DEBUG){
            Log.i(tag,men);
        }
    }
/*
    public boolean isMyServiceRunning(Class<?> serviceClass, Context context) {
        ActivityManager manager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (serviceClass.getName().equals(service.service.getClassName())) {
                return true;
            }
        }
        return false;
    }

    public void Vibrar(long[] pattern) {
        Vibrator v = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
        // Vibrate for 500 milisegundos
        //pattern = { 0, milli};
        v.vibrate(pattern, -1);
    }

    public long[] VibrarPush() {
        long[] pattern = {0, 70};
        return pattern;
    }


    public long[] VibrarError() {
        long[] pattern = {0, 100, 70, 100};
        return pattern;
    }


    public void Notificar(String title, String body, int icono,Intent intent, int id) {



        intent.putExtra("NoreiniciarServicio", 1);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0 , intent, PendingIntent.FLAG_ONE_SHOT);

        Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        //
        String NOTIFICATION_CHANNEL_ID = "Emergencia";

        RemoteViews myRemoteView = new RemoteViews(context.getPackageName(), R.layout.imagen_notification);

        Bitmap bit= BitmapFactory.decodeResource(context.getResources(),icono);
        myRemoteView.setImageViewBitmap(R.id.icono,bit);
        myRemoteView.setTextViewText(R.id.noti_titulo, title);
        myRemoteView.setTextViewText(R.id.noti_body, body);


        NotificationCompat.Builder notificationBuilder =
                new NotificationCompat.Builder(context, NOTIFICATION_CHANNEL_ID);
        notificationBuilder
                .setSmallIcon(R.drawable.logo)
                .setAutoCancel(false)
                .setVibrate(new long[]{1000, 1000, 500, 1000})
                .setSound(defaultSoundUri)
                .setPriority(1)
                .setContentIntent(pendingIntent)
                .setContentInfo("info")
                .setContent(myRemoteView);

        NotificationManager notificationManager =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        // Since android Oreo notification channel is needed.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel notificationChannel = new NotificationChannel(NOTIFICATION_CHANNEL_ID,
                    "Notification",
                    NotificationManager.IMPORTANCE_DEFAULT);

            Uri sonido = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);


            notificationChannel.setDescription("Descripcion");
            notificationChannel.enableLights(true);
            notificationChannel.setLightColor(Color.BLUE);
            notificationChannel.setVibrationPattern(new long[]{1000, 1000, 500, 1000});
            notificationChannel.enableLights(true);
            notificationBuilder.setSound(sonido);
            notificationBuilder.setPriority(1);
            notificationManager.createNotificationChannel(notificationChannel);
        }

        notificationManager.notify(id, notificationBuilder.build());
    }


    public boolean Check_Log() {

        try {
            Base base = new Base(context);
            SQLiteDatabase db = base.getWritableDatabase();

            Logo("Checklog","mostrando...");
            String nombre="";

            Cursor c =  db.rawQuery("SELECT * from login ",null);
            c.moveToFirst();
            int cont=c.getCount();
            c.close();
            db.close();
            Logo("Checklog","-----"+cont);

            if(cont>0)
            {
                return true;
            }
        }catch (Exception e){}


        return false;


    }


    public void LogOut() {

        BorrarLogin();
        BorrarGrupo();

        context.stopService(new Intent(context.getApplicationContext(), ServiceAlerta.class));
        context.stopService(new Intent(context.getApplicationContext(), Enviador.class));

        context.startActivity(new Intent(context.getApplicationContext(), Login.class));



    }

    public void BorrarLogin(){
        try {
            Base base = new Base(context);
            SQLiteDatabase db = base.getWritableDatabase();

            db.execSQL("DELETE from login ");
        }catch (Exception e){}



    }

    public String GetNombre() {
        String nombre="";

        try {
            Base base = new Base(context);
            SQLiteDatabase db = base.getWritableDatabase();

            Cursor c =  db.rawQuery("SELECT * from login ",null);
            c.moveToFirst();
            if(c.getCount()>0){
                c.moveToFirst();

                nombre=c.getString(c.getColumnIndex("nombre"));

            }
            c.close();
            db.close();
        }catch (Exception e){}



        return nombre;
    }

    public String GuardarGrupo(String nombre) {
        String UUID="";
        try {
            Base base = new Base(context);
            SQLiteDatabase db = base.getWritableDatabase();

            String id_usuario=GetIdUsuario();
            UUID=GetUIID();
            ContentValues grupo = new ContentValues();

            grupo.put("id_grupo", UUID);
            grupo.put("id_usuario",id_usuario );
            grupo.put("nombre", nombre );
            grupo.put("enviado", 0);


            db.insert("grupo", null, grupo);
            db.close();
        }catch (Exception e){}


        return  UUID;
    }




    public String GetIdGrupo() {
        String id_grupo="";
        try {
            Base base = new Base(context);
            SQLiteDatabase db = base.getWritableDatabase();

            Cursor c =  db.rawQuery("SELECT * from grupo ",null);
            if(c.getCount()>0){
                c.moveToFirst();

                id_grupo=c.getString(c.getColumnIndex("id_grupo"));

            }
            c.close();
            db.close();
        }catch (Exception e){}




        return id_grupo;


    }
    public String GetNombreGrupo() {
        String nombre="";
        try {
            Base base = new Base(context);
            SQLiteDatabase db = base.getWritableDatabase();

            Cursor c =  db.rawQuery("SELECT * from grupo ",null);
            if(c.getCount()>0){
                c.moveToFirst();

                nombre=c.getString(c.getColumnIndex("nombre"));

            }
            c.close();
            db.close();
        }catch (Exception e){}




        return nombre;


    }

    public Bitmap GetQR(String texto){
        Bitmap bitmap = QRCode.from(texto).bitmap();
        return bitmap;
    }

    public String GuardarGrupo2(String codigo) {
        String id_grupo="";

        String url=GetUrl()+context.getString(R.string.url_GetGrupo);
        String respuesta=Conexion("{\"id_grupo\":\""+codigo+"\",\"id_usuario\":\""+GetIdUsuario()+"\"}",url);
        try {
            Base base = new Base(context);
            SQLiteDatabase db = base.getWritableDatabase();

            JSONArray jsonArray=new JSONArray(respuesta);
            if (jsonArray.length()!=0){

                JSONObject jsonObject=new JSONObject(jsonArray.get(0).toString());

                id_grupo=jsonObject.get("id_grupo").toString();

                ContentValues grupo = new ContentValues();
                grupo.put("id_grupo", jsonObject.get("id_grupo").toString());
                grupo.put("id_usuario",jsonObject.get("id_usuario").toString());
                grupo.put("nombre", jsonObject.get("nombre").toString() );
                grupo.put("enviado", 1);


                db.insert("grupo", null, grupo);

                db.close();
                return id_grupo;


            }else {
                return id_grupo;
            }



        } catch (JSONException e) {
            Logo("Escaner",e.getMessage());

        }
        return  id_grupo;

    }

    public void SalirGrupo() {
        String url=GetUrl()+context.getString(R.string.url_SalirGrupo);
        Conexion("{\"id_grupo\":\""+GetIdGrupo()+"\",\"id_usuario\":\""+GetIdUsuario()+"\"}",url);

        try {
            Base base = new Base(context);
            SQLiteDatabase db = base.getWritableDatabase();

            db.execSQL("DELETE from grupo ");
        }catch (Exception e){}

    }

    public void BorrarGrupo() {

        try {
            Base base = new Base(context);
            SQLiteDatabase db = base.getWritableDatabase();

            db.execSQL("DELETE from grupo ");
        }catch (Exception e){}

    }

    public ProgressDialog Wait(String mensaje){
        final ProgressDialog progressDialog = new ProgressDialog(context);
        progressDialog.setIcon(R.mipmap.ic_launcher);
        progressDialog.setMessage(mensaje);
        return progressDialog;
    }

    public void EnviarGrupo() {

        String id_grupo="",id_usuario="",nombre="",response="[]";

        try {
            Base base = new Base(context);
            SQLiteDatabase db = base.getWritableDatabase();

            Cursor c =  db.rawQuery("SELECT * from grupo where enviado='0' ",null);
            if(c.getCount()>0){
                c.moveToFirst();

                id_grupo=c.getString(c.getColumnIndex("id_grupo"));
                id_usuario=c.getString(c.getColumnIndex("id_usuario"));
                nombre=c.getString(c.getColumnIndex("nombre"));

                String data="{\"id_grupo\":\""+id_grupo+"\",\"id_usuario\":\""+id_usuario+"\",\"nombre\":\""+nombre+"\"}";
                String url=GetUrl()+context.getString(R.string.url_SetGrupo);
                response=Conexion(data,url);

                JSONObject jsonObject=new JSONObject(response);
                if(jsonObject.get("respuesta").toString().contains("1")){
                    db.execSQL("UPDATE grupo SET enviado=1 WHERE id_grupo='"+id_grupo+"' ");
                }
                c.close();
                db.close();
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }




    }


    public String GetIdUsuario() {
        String id_usuario="";
        try {
            Base base = new Base(context);
            SQLiteDatabase db = base.getWritableDatabase();

            Cursor c =  db.rawQuery("SELECT * from login ",null);
            c.moveToFirst();
            if(c.getCount()>0){
                c.moveToFirst();

                id_usuario=c.getString(c.getColumnIndex("id_usuario"));

            }
            c.close();
            db.close();
        }catch (Exception e){}

        return id_usuario;
    }


    public String GetIdUsuarioGrupo() {
        String id_usuario="";
        try {
            Base base = new Base(context);
            SQLiteDatabase db = base.getWritableDatabase();

            Cursor c =  db.rawQuery("SELECT * from grupo ",null);
            if(c.getCount()>0){
                c.moveToFirst();

                id_usuario=c.getString(c.getColumnIndex("id_usuario"));

            }
            c.close();
            db.close();
        }catch (Exception e){}




        return id_usuario;
    }

    public String GetIdAlerta() {
        String id_alerta="";
        try {
            Base base = new Base(context);
            SQLiteDatabase db = base.getWritableDatabase();

            Cursor c =  db.rawQuery("SELECT * from alertas ",null);
            if(c.getCount()>0){
                c.moveToFirst();

                id_alerta=c.getString(c.getColumnIndex("id_alerta"));

            }
            c.close();
            db.close();


        }catch (Exception e){}


        return id_alerta;
    }


    public String GetIdAviso() {
        String id_aviso="";
        try {
            Base base = new Base(context);
            SQLiteDatabase db = base.getWritableDatabase();

            Cursor c =  db.rawQuery("SELECT * from avisos ",null);
            if(c.getCount()>0){
                c.moveToFirst();

                id_aviso=c.getString(c.getColumnIndex("id_aviso"));

            }
            c.close();
            db.close();
        }catch (Exception e){}




        return id_aviso;
    }


    public void CreaLogin(JSONObject jsonObject) {

        try {
            Base base = new Base(context);
            SQLiteDatabase db = base.getWritableDatabase();

            String id_usuario=jsonObject.get("id_usuario").toString();
            String nombre=jsonObject.get("nombres").toString()+" "+jsonObject.get("apellidos").toString();

            ContentValues login = new ContentValues();
            login.put("id_usuario", id_usuario);
            login.put("nombre",nombre);


            db.insert("login", null, login);

            db.close();

        } catch (JSONException e) {

        }

    }

    public Boolean GetAlertas(String json){


        try {
            JSONObject jsonObject = new JSONObject(json);
            if(!GetIdAlerta().contains(jsonObject.get("id_alerta").toString())){
                Base base = new Base(context);
                SQLiteDatabase db = base.getWritableDatabase();

                if(GetIdAlerta()==""){
                    ContentValues alerta = new ContentValues();

                    alerta.put("id_alerta", jsonObject.get("id_alerta").toString());


                    db.insert("alertas", null, alerta);
                }else{
                    db.execSQL("UPDATE alertas SET id_alerta='"+jsonObject.get("id_alerta").toString()+"' " );
                }
                db.close();
                return true;
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return false;
    }


    public Boolean GetAvisos(String json){
        try{
            JSONObject jsonObject=new JSONObject(json);
            if(!GetIdAviso().contains(jsonObject.get("id_aviso").toString())) {
                Base base = new Base(context);
                SQLiteDatabase db = base.getWritableDatabase();

                if (GetIdAviso() == "") {
                    ContentValues avisos = new ContentValues();

                    avisos.put("id_aviso", jsonObject.get("id_aviso").toString());


                    db.insert("avisos", null, avisos);
                } else {
                    db.execSQL("UPDATE avisos SET id_aviso='" + jsonObject.get("id_aviso").toString() + "' ");
                }
                db.close();
                return true;
            }
        }catch (Exception e){
            Logo("Error",e.toString());



        }


        return false;
    }


    public String GetChat(String chat) {
        String ini="1";

        if(chat.equals("") || chat.equals("[]"))
        {
            ini="0";
        }
        String url=GetUrl()+context.getString(R.string.url_GetChat);
        chat=Conexion("{\"id_grupo\":\""+GetIdGrupo()+"\",\"ini\":\""+ini+"\"}",url);
        return chat;
    }


    public void GuardarChat(String mensaje) {
        String UUID="";
        try {
            Base base = new Base(context);
            SQLiteDatabase db = base.getWritableDatabase();

            UUID=GetUIID();
            ContentValues chat = new ContentValues();

            chat.put("id_chat", UUID);
            chat.put("mensaje", "{\"id_chat\":\""+UUID+"\",\"id_grupo\":\""+GetIdGrupo()+"\",\"id_usuario\":\""+GetIdUsuario()+"\",\"mensaje\":\""+ToBase64(mensaje)+"\"}" );
            chat.put("enviado", 0);


            db.insert("chat", null, chat);
            db.close();
        }catch (Exception e){
            Log.i("chatee",e.getMessage());
        }


    }

    public void SetChat() {
        String mensaje="",response="",id_chat="";
        try {
            Base base = new Base(context);
            SQLiteDatabase db = base.getWritableDatabase();

            Cursor c =  db.rawQuery("SELECT * from chat where enviado='0' ",null);
            if(c.getCount()>0){
                c.moveToFirst();

                id_chat=c.getString(c.getColumnIndex("id_chat"));
                mensaje=c.getString(c.getColumnIndex("mensaje"));

                String url=GetUrl()+context.getString(R.string.url_SetChat);
                response=Conexion(mensaje,url);

                JSONObject jsonObject=new JSONObject(response);
                if(jsonObject.get("respuesta").toString().contains("1")){
                    db.execSQL("UPDATE chat SET enviado=1 WHERE id_chat='"+id_chat+"' ");
                }
            }
            c.close();
            db.close();
        } catch (JSONException e) {
            e.printStackTrace();
        }


    }

    void SinGrupo(){
        AlertDialog.Builder alertDialog = new AlertDialog.Builder(context);
        alertDialog.setTitle("Sin Grupo");
        alertDialog.setMessage("Primero debes estar en un grupo, ¿Deseas unirte?");



        alertDialog.setIcon(R.drawable.boton_alerta);

        alertDialog.setPositiveButton("Unirse",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        context.startActivity(new Intent(context, Grupo.class));

                    }
                });

        alertDialog.setNegativeButton("Cancelar",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.cancel();
                    }
                });

        alertDialog.show();
    }


    public String ToString2(String str){
        byte[] data = Base64.decode(str, Base64.DEFAULT);
        try {
            str = new String(data, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return str;
    }

    public String ToBase64(String toString) {
        byte[] data;
        try {
            data = toString.getBytes("UTF-8");
            toString = Base64.encodeToString(data, Base64.DEFAULT);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }


        return toString.replace("\n","");
    }*/
}


