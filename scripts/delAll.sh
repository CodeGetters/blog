#!/bin/bash

# 获取当前文件夹的父文件夹绝对路径
current_dir=$(dirname "$(pwd)")

find "$current_dir" -name "node_modules" -type d -prune -print

# find "$current_dir" -name "node_modules"
# -type d：在 current_dir 及其子目录中查找所有名为 “node_modules” 的目录。
# -exec rm -rf {} +：对每一个找到的 “node_modules” 目录执行
# rm -rf 命令，删除该目录及其所有内容
# find "$current_dir" -name "node_modules" -type d -prune -exec rm -rf '{}' +

find "$current_dir" -name "node_modules" -type d -exec rm -rf {} +

echo "已删除上面路径的文件夹"
