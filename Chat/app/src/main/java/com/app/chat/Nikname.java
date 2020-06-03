package com.app.chat;

import androidx.appcompat.app.AppCompatActivity;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.app.chat.Chat.Categorias;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;

public class Nikname extends AppCompatActivity {

    EditText nombre;
    Button enviar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_nikname);
        setTitle("Nombre");
        nombre=findViewById(R.id.nombre);
        enviar=findViewById(R.id.enviar);

        enviar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(PedirPermiso()) {
                    if (nombre.getText().toString().replace(" ", "").length() != 0 && !nombre.getText().toString().contains(" ")) {
                        startActivity(new Intent(getApplicationContext(), Categorias.class).putExtra("nombre", nombre.getText().toString()));
                    } else {
                        Toast.makeText(Nikname.this, "El nombre no puede estar vacio o contener espacios.", Toast.LENGTH_SHORT).show();
                    }
                }
            }
        });

        AdView m = findViewById(R.id.banner);
        AdRequest adRequest = null;
        adRequest=new AdRequest.Builder().build();
        m.loadAd(adRequest);

    }

    public Boolean PedirPermiso() {

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M){
            int permsRequestCode = 100;
            String[] perms = {Manifest.permission.READ_PHONE_STATE};

            int sd = checkSelfPermission(Manifest.permission.READ_PHONE_STATE);

            if (sd == PackageManager.PERMISSION_GRANTED ) {

                return true;
            } else {

                requestPermissions(perms, permsRequestCode);
                return false;
            }

        }else{
        }
        return true;
    }
}
