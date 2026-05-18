# Edit this configuration file to define what should be installed on
# your system.  Help is available in the configuration.nix(5) man page
# and in the NixOS manual (accessible by running ‘nixos-help’).

{
  config,
  pkgs,
  lib,
  ...
}:

{
  imports = [
    # Include the results of the hardware scan.
    ./hardware-configuration.nix
  ];
  nix.settings = {
    # 启用实验性功能
    #experimental-features = [
    # "nix-command"
    # "flakes"
    #];

    # 如果你想同时配置二进制缓存镜像（可选）
    substituters = [
      "https://mirror.sjtu.edu.cn/nix-channels/store" # 上海交通大学
      "https://mirrors.tuna.tsinghua.edu.cn/nix-channels/store" # 清华大学
      "https://cache.nixos.org/"
    ];
  };
  # boot.initrd.availableKernelModules = [ "nvme" "ahci" "sd_mod" ]; # 添加 nvme 模块
  # boot.initrd.kernelModules = [ "nvme" ]; # 确保 nvme 在启动时加载
  # Bootloader.
  boot.loader.systemd-boot.enable = false; # 你同时启用了两个引导加载程序(systemd-boot, grub)，所以需要禁用其中一个。
  boot.loader.efi.canTouchEfiVariables = true; # 允许 NixOS 管理 EFI 启动项
  boot.loader.efi.efiSysMountPoint = "/boot/efi"; # 确保这与您的 EFI 分区挂载点一致
  # 确保GRUB支持多系统引导并启用os-prober
  boot.loader.grub = {
    enable = true;
    efiSupport = true; # 【关键】为 UEFI 编译和安装 GRUB
    device = "nodev"; # 因为UEFI启动，不需要指定设备，或者指定为磁盘，如"/dev/nvme0n1"
    useOSProber = true; # 关键：启用os-prober来自动探测其他系统
    efiInstallAsRemovable = false;
    #efiInstallDevice = "/dev/nvme0n1p1"; # 已过时设置
    #efiMountPoint = "/boot/efi"; # 已过时设置
    # 手动添加 Garuda Linux 启动项 (链式加载) sudo blkid /dev/nvme0n1p1
    #extraInstallCommands = ''
    #${pkgs.grub2_efi}/bin/grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=GRUB --modules="nvme part_gpt ext2 fat" --recheck
    #'';
    # 关键：显式声明需要包含的模块，确保包含 nvme 模块
    # extraModules = [ "nvme" "part_gpt" "ext2" "fat" ];
    extraEntries = ''
      menuentry "Garuda Linux" {
        insmod nvme
        insmod part_gpt
        insmod fat
        insmod chain
        insmod search_fs_uuid # 显式加载UUID搜索模块
        insmod nvme # 显式加载NVMe磁盘支持模块 (如果你的磁盘是NVMe)
        search --no-floppy --set=root --fs-uuid 9088-49F1
        chainloader /EFI/Garuda/grubx64.efi
      }
    '';
  };
  networking.hostName = "nixos"; # Define your hostname.
  # networking.wireless.enable = true;  # Enables wireless support via wpa_supplicant.

  # Configure network proxy if necessary
  # networking.proxy.default = "http://user:password@proxy:port/";
  # networking.proxy.noProxy = "127.0.0.1,localhost,internal.domain";

  # Enable networking
  networking.networkmanager.enable = true;
  networking.networkmanager.connectionConfig = lib.mkForce {
    "wifi.powersave" = 2;
  };
  # Set your time zone.
  time.timeZone = "Asia/Shanghai";

  # Select internationalisation properties.
  i18n.defaultLocale = "zh_CN.UTF-8";

  i18n.extraLocaleSettings = {
    LC_ADDRESS = "zh_CN.UTF-8";
    LC_IDENTIFICATION = "zh_CN.UTF-8";
    LC_MEASUREMENT = "zh_CN.UTF-8";
    LC_MONETARY = "zh_CN.UTF-8";
    LC_NAME = "zh_CN.UTF-8";
    LC_NUMERIC = "zh_CN.UTF-8";
    LC_PAPER = "zh_CN.UTF-8";
    LC_TELEPHONE = "zh_CN.UTF-8";
    LC_TIME = "zh_CN.UTF-8";
  };

  # Enable the X11 windowing system.
  services.xserver.enable = true;

  # Enable the GNOME Desktop Environment.
  #services.xserver.displayManager.gdm.enable = true;
  #services.xserver.desktopManager.gnome.enable = true;
  # 修改后（新选项名）：
  services.displayManager.gdm.enable = true;
  services.desktopManager.gnome.enable = true;

  # kde
  # services.xserver.displayManager.sddm.enable = true;
  # services.xserver.desktopManager.plasma5.enable = true;

  # Configure keymap in X11
  services.xserver.xkb = {
    layout = "cn";
    variant = "";
  };

  # Enable CUPS to print documents.
  services.printing.enable = true;

  # Enable sound with pipewire.
  services.pulseaudio.enable = false;
  security.rtkit.enable = true;
  services.pipewire = {
    enable = true;
    alsa.enable = true;
    alsa.support32Bit = true;
    pulse.enable = true;
    # If you want to use JACK applications, uncomment this
    #jack.enable = true;

    # use the example session manager (no others are packaged yet so this is enabled by default,
    # no need to redefine it in your config for now)
    #media-session.enable = true;
  };

  # Enable touchpad support (enabled default in most desktopManager).
  # services.xserver.libinput.enable = true;

  # Define a user account. Don't forget to set a password with ‘passwd’.
  users.users.aa = {
    isNormalUser = true;
    description = "aa";
    extraGroups = [
      "networkmanager"
      "wheel"
    ];
    packages = with pkgs; [
      #  thunderbird

    ];
  };

  # Install firefox.
  programs.firefox.enable = true;

  # Allow unfree packages
  nixpkgs.config.allowUnfree = true;

  # List packages installed in system profile. To search, run:
  # $ nix search wget
  environment.systemPackages = with pkgs; [
    #  vim # Do not forget to add an editor to edit configuration.nix! The Nano editor is also installed by default.
    #  wget
    gnomeExtensions.kimpanel # 在系统包中声明安装 kimpanel 扩展
    iw
    wirelesstools
    git
    fish
    fastfetch
    fcitx5-with-addons # 这是一个包含常用模块的包装器
    fcitx5-chinese-addons # 中文输入法引擎（拼音、五笔等）
    fcitx5-configtool # 图形化配置工具（可选，但推荐安装）
    # fcitx5-rime        # 如果你想用 Rime（中州韵）输入引擎，取消注释此行
    # fcitx5-material-color  # 如果你喜欢 Material Color 主题，取消注释此行
    os-prober
    efibootmgr
  ];

  # 配置 i18n 输入法
  i18n.inputMethod = {
    enable = true;
    type = "fcitx5";
    fcitx5.addons = with pkgs; [
      fcitx5-chinese-addons # 确保中文输入引擎在 fcitx5 的 addons 列表中
      # fcitx5-rime          # 如果使用 Rime，同样需要在这里添加
    ];
  };

  # 设置相关的环境变量 (通常配置了 i18n.inputMethod 后会自动设置，但明确写出也无妨)
  environment.variables = {
    # GTK_IM_MODULE = "fcitx"; # 反而可能使其回退到 X11 模式，导致问题
    # QT_IM_MODULE = "fcitx";
    # XMODIFIERS = "@im=fcitx";
  };
  # Some programs need SUID wrappers, can be configured further or are
  # started in user sessions.
  # programs.mtr.enable = true;
  # programs.gnupg.agent = {
  #   enable = true;
  #   enableSSHSupport = true;
  # };

  # List services that you want to enable:

  # Enable the OpenSSH daemon.
  services.openssh.enable = true;

  # Open ports in the firewall.
  # networking.firewall.allowedTCPPorts = [ ... ];
  # networking.firewall.allowedUDPPorts = [ ... ];
  # Or disable the firewall altogether.
  # networking.firewall.enable = false;

  # This value determines the NixOS release from which the default
  # settings for stateful data, like file locations and database versions
  # on your system were taken. It‘s perfectly fine and recommended to leave
  # this value at the release version of the first install of this system.
  # Before changing this value read the documentation for this option
  # (e.g. man configuration.nix or on https://nixos.org/nixos/options.html).
  system.stateVersion = "25.11"; # Did you read the comment?
  system.copySystemConfiguration = true;
}
