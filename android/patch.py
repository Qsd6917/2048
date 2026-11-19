"""Apply the Simplified Chinese web UI patch to the supported Android APK."""

import argparse
import hashlib
import re
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


BASE_SHA256 = "80e994fb861ce839e6baa39624e91a43e92fdf2bf6d533bef13d731ea972ab29"
INDEX = "assets/www/index.html"
BOOTSTRAP = b'  <script type="text/javascript" src="js/bootstrap.js"></script>'
LOCALIZATION = "assets/www/js/localization-zh-cn.js"
SIGNATURE_ENTRY = re.compile(
    r"^META-INF/(?:MANIFEST\.MF|[^/]+\.(?:SF|RSA|DSA|EC)|SIG-[^/]+)$", re.I
)


def patch(source, destination):
    with source.open("rb") as original:
        if hashlib.file_digest(original, "sha256").hexdigest() != BASE_SHA256:
            raise ValueError("原包与支持的 5.2-play 基线不一致")
        original.seek(0)
        locale_script = Path(__file__).with_name("localization-zh-cn.js").read_bytes()
        with ZipFile(original) as apk:
            index = apk.read(INDEX)
            if index.count(BOOTSTRAP) != 1 or LOCALIZATION in apk.namelist():
                raise ValueError("原包的网页入口与预期不一致")
            loader = b'  <script src="js/localization-zh-cn.js"></script>\n'
            index = index.replace(BOOTSTRAP, loader + BOOTSTRAP)

            output = destination.open("xb")
            try:
                with output, ZipFile(output, "w", allowZip64=False) as patched:
                    for entry in apk.infolist():
                        if SIGNATURE_ENTRY.fullmatch(entry.filename):
                            continue
                        content = index if entry.filename == INDEX else apk.read(entry)
                        patched.writestr(entry, content)
                    patched.writestr(LOCALIZATION, locale_script, ZIP_DEFLATED)
            except Exception:
                destination.unlink()
                raise


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="本地原版 APK")
    parser.add_argument("destination", type=Path, help="输出未签名 APK")
    args = parser.parse_args()
    try:
        patch(args.source, args.destination)
    except (OSError, ValueError) as error:
        parser.exit(1, f"打补丁失败：{error}\n")


if __name__ == "__main__":
    main()
