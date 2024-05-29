# setup.py
from setuptools import setup
from Cython.Build import cythonize
import numpy

setup(
    ext_modules=cythonize("widget_detector.pyx"),
    include_dirs=[numpy.get_include()]
)

#/home/ss/work/dev/devweb/flask/wbscr/prj1/crtuto/jsoni
