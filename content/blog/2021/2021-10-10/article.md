---
title: UnityエディタのPlayMode遷移時に処理をはさむ
date: "2021-10-10"
tags: [Unity,技術系]
---

## 割とよく忘れがちなのでメモ

ググれば情報は出てくるがググるためのワードが出てこなかった時の為にメモ。

UnityエディタでPlayModeを起動したときにゲーム全体の初期化処理( 本来はTitleシーンとかの前に呼び出したい処理 )を記述する方法。  
[Unityリファレンス : 起動時エディタースクリプト実行](https://docs.unity3d.com/ja/2019.4/Manual/RunningEditorCodeOnLaunch.html)  
[Unityリファレンス : EditorApplication](https://docs.unity3d.com/ja/current/ScriptReference/EditorApplication.html)  
```InitializeOnLoad```属性をスタティックコンストラクタのあるクラスに記述することでこの処理を走らせることができる。


下の例ではアプリケーション初期化用シーン```AppInitialize```をシーン開始時にロードするようにしている。

```csharp
using UnityEditor;
using UnityEngine.SceneManagement;

/// <summary>
/// Unityエディタでの起動時にPlayModeへ入る前に行う処理.
/// </summary>
[InitializeOnLoad]
public class Startup
{
    static Startup()
    {
        EditorApplication.playModeStateChanged += OnPlayModeStateChanged;
    }


    private static void OnPlayModeStateChanged(PlayModeStateChange stateChange)
    {
        const string appInitializeScene = "AppInitialize";            
        if (stateChange == PlayModeStateChange.EnteredPlayMode)
        {
            if (SceneManager.GetActiveScene().name != appInitializeScene)
            {
                SceneManager.LoadScene(appInitializeScene);
            }
        }
    }

}

```

まぁでもこの手段をとるのはあまり得策じゃないのかも、特定のシーンに依存してるてのは開発するうえで足かせになるやもしれん。  
シーン同士の依存自体は疎にしたいよね。  



