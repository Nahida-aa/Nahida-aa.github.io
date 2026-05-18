# GRUB (GRand Unified Bootloader)

is a boot loader. The current GRUB is also referred to as GRUB 2. The original GRUB, or GRUB Legacy, corresponds to versions 0.9x. This page exclusively describes GRUB 2.
> 是一个 引导 加载器。当前的 GRUB 也被称为 GRUB 2。原始的 GRUB，或 GRUB Legacy，对应于版本 0.9x。本页面专门描述 GRUB 2。

Note: In the entire article esp denotes the mountpoint of the EFI system partition aka ESP.
> 注意：在整篇文章中，esp 表示 EFI 系统分区的挂载点，也称为 ESP。

## 1 Supported file systems

GRUB bundles its own support for multiple file systems, notably FAT32, ext4, Btrfs or XFS. See #Unsupported file systems for some caveats.
> GRUB 捆绑了对多个文件系统的支持，特别是 FAT32、ext4、Btrfs 或 XFS。有关一些注意事项，请参见 #Unsupported file systems。

Warning: File systems can get new features not yet supported by GRUB, making them unsuitable for /boot unless disabling incompatible features. This can be typically avoided by using a separate /boot partition with a universally supported file system such as FAT32.
> 警告：文件系统可能会获得 GRUB 尚不支持的新功能，使其不适用于 /boot，除非禁用不兼容的功能。这通常可以通过使用具有普遍支持的文件系统（如 FAT32）的单独 /boot 分区来避免。

## 2 UEFI systems

Note:  注意事项：

  - It is recommended to read and understand the [Unified Extensible Firmware Interface](#), Partitioning#GUID Partition Table and Arch boot process#UEFI 2 pages.
    >建议阅读并理解统一可扩展固件接口、分区#UEFI分区表和Arch靴子进程#UEFI 2页面。
  - When installing to use UEFI it is important to boot the installation media in UEFI mode, otherwise efibootmgr will not be able to add the GRUB UEFI boot entry. Installing to the fallback boot path will still work even in BIOS mode since it does not touch the NVRAM.
    >在安装以使用UEFI时，务必在UEFI模式下靴子引导安装介质，否则efibootmgr将无法添加GRUB UEFI靴子条目。即使在BIOS模式下，安装到回退靴子路径仍将有效，因为它不接触NVRAM。
  - To boot from a disk using UEFI, an EFI system partition is required. Follow EFI system partition#Check for an existing partition to find out if you have one already, otherwise you need to create it.
    >若要使用UEFI从磁盘引导靴子子，则需要一个NTFS系统分区。检查现有的分区以确定您是否已经有了一个分区，否则您需要创建一个分区。
  - This whole article assumes that inserting additional GRUB2 modules via insmod is possible. As discussed in #Shim-lock, this is not the case on UEFI systems with Secure Boot enabled. If you want to use any additional GRUB module that is not included in the standard GRUB EFI file grubx64.efi on a Secure Boot system, you have to re-generate the GRUB EFI grubx64.efi with grub-mkstandalone or reinstall GRUB using grub-install with the additional GRUB modules included.
    >本文假设可以通过insmod插入其他GRUB 2模块。如#Shim-lock中所述，在启用了安全靴子的UEFI系统上并非如此。如果要在安全靴子系统上使用标准GRUB安装文件grubx64.efi中未包含的任何其他GRUB模块，则必须使用grub-mkstandalone重新生成GRUB安装文件grubx64.efi，或者使用grub-install重新安装包含其他GRUB模块的GRUB。

### 2.1 Installation

Note:  注意事项：

  - UEFI firmwares are not implemented consistently across manufacturers. The procedure described below is intended to work on a wide range of UEFI systems but those experiencing problems despite applying this method are encouraged to share detailed information, and if possible the workarounds found, for their hardware-specific case. A /EFI examples article has been provided for such cases.
    >UEFI固件在制造商之间的实施并不一致。下面描述的过程旨在用于广泛的UEFI系统，但鼓励那些尽管应用此方法但仍遇到问题的用户分享详细信息，如果可能的话，还应提供针对其硬件特定情况的解决方法。已为此类情况提供了一个示例文章。
  - The section assumes you are installing GRUB for x64 (64-bit) UEFI. For IA32 (32-bit) UEFI (not to be confused with 32-bit CPUs), replace x86_64-efi with i386-efi where appropriate. Follow the instructions in Unified Extensible Firmware Interface#Checking the firmware bitness to figure out your UEFI's bitness.
    >本节假定您正在安装GRUB for x64（64位）UEFI。对于IA 32（32位）UEFI（不要与32位CPU混淆），请在适当的情况下将x86_64-efi替换为i386-efi。按照统一可扩展固件接口#中的说明检查固件位数以确定UEFI的位数。

