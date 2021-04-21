---
title: MagicLeapのプロジェクトにMRTKを導入してみた
date: "2021-04-22T00:30"
---

MagicLeapの公式にてMRTKに対応したとのことなので趣味で開発してるMagicLeapプロジェクトにMRTKを軽い気持ちでぶち込んでみたら数十のエラーに襲われた話。

↓この公式ページの通りに進めればほぼ大丈夫
https://developer.magicleap.com/en-us/learn/guides/unity-mrtk-project-setup

今回のエラーはもしかしたらワシの環境だけで発生してるのかもしれないけど一応メモ  

一応手順通りにMRTKをインポートしたところまでは問題なかったがその後の Magic [Leap Plugin v1.1 for MRTK 2.6.1 for Unity](https://github.com/magicleap/MRTK-MagicLeap/releases/) をインポートしたら数十のエラーが発生、一応臭いものに蓋ではあるが下の対応をした  
不覚にもスクショとかは一切撮ってなかった...


---

```csarp
Assets\MagicLeap-Tools\Code\Input\Hands\Visualizers\HandAxisVisualizer.cs(57,43): error CS0246: The type or namespace name 'ManagedHand' could not be found (are you missing a using directive or an assembly reference?)
```  

このエラーはManagedHandクラスのnamespaceが MagicLeapToolsからMagicLeap.MRTK.DeviceManagement.Input.Handsへ移動したため以下のエラーが出る、該当スクリプトで↓を追加すれば解消できた。

```csharp 
using MagicLeap.MRTK.DeviceManagement.Input.Hands;
``` 

---

```
Assets\MagicLeap-Tools\Code\Events\EventTemplates.cs(42,53): error CS0246: The type or namespace name 'InteractionPoint' could not be found (are you missing a using directive or an assembly reference?)
```

このエラーも InteractionPoint は MagicLeap.MRTK.DeviceManagement.Input.Hands の名前空間にあるので該当スクリプトにて↓を追加すれば解消。

```csharp
using MagicLeap.MRTK.DeviceManagement.Input.Hands;
``` 

---

```
Assets\MagicLeap-Tools\Code\Networking\Transmission\TransmissionObject.cs(86,29): error CS0103: The name 'TransformUtilities' does not exist in the current context
```

このエラーは TransformUtilities クラスが  MagicLeap.MRTK.DeviceManagement の名前空間にあるので該当スクリプトにて↓を追加すれば解消。

```csharp
using  MagicLeap.MRTK.DeviceManagement;
```

---

```
Assets\MagicLeap-Tools\Code\Input\Hands\Inputs\DirectManipulation.cs(369,33): error CS0103: The name 'MotionUtilities' does not exist in the current context
```

このエラーは該当スクリプトで↓を追加して解消。

```csharp
using MagicLeap.MRTK.DeviceManagement;
```

---

```
Assets\MagicLeap-Tools\Code\Input\Hands\Objects\ManagedHandCollider.cs(82,52): error CS1061: 'InteractionPoint' does not contain a definition for 'DirectManipulations' and no accessible extension method 'DirectManipulations' accepting a first argument of type 'InteractionPoint' could be found (are you missing a using directive or an assembly reference?)
```

このエラーは Grasp の DirectManipulations のプロパティが削除されてるので発生してるっぽかった。
該当コードのコメント //only enable if we aren't directly manipulating anything: よりおそらく何かしらのオブジェクトを把持してないときに有効になる条件だと思われるので以下の様にコードを変更 ( 山勘で書いただけなのでもしかしたら違うかも...

```csharp
if (_managedHand.Gesture.Grasp.DirectManipulations.Count == 0)
// ↑の条件式を↓の形に変更した
if (!_managedHand.Gesture.Grasp.active)
```


とりあえずこれで動くようにはなったけどまだ細かいところをチェックはしてないからそれは後日かなぁ。

