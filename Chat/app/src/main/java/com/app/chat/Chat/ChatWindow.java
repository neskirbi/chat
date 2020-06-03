package com.app.chat.Chat;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

import com.app.chat.R;

public class ChatWindow extends AppCompatActivity {
    Intent intent;
    String id_sala;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_window);
        intent=getIntent();
        setTitle(intent.getExtras().get("titulo").toString());
        id_sala=intent.getExtras().get("id_sala").toString();

    }
}
