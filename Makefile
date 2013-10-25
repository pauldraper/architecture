MAKEFLAGS := -j4

BUILD := build
CLOSURE_BUILDER := $(BUILD)/closure/closure/bin/build/closurebuilder.py
CLOSURE_COMPILER := $(BUILD)/closure-compiler/compiler.jar
CLOSURE_LIBS := $(BUILD)/closure/closure/goog $(BUILD)/closure/third_party/closure/goog
INSERT_SCRIPT_TAGS := $(BUILD)/insert_script_tags.py

SRC := src

JS_ROOTS := $(SRC)/js/arch $(CLOSURE_LIBS)
JS_EXTERNS = $(wildcard $(BUILD)/closure-compiler/externs/*.js)

TARGET := bin

.PHONY: force


run:
	python -m SimpleHTTPServer 8080


clean: clean-debug clean-compile


debug: $(SRC)/index.html
clean-debug:
	rm -fr $(SRC)/index.html

.PHONY: $(SRC)/index.html
$(SRC)/index.html:  $(SRC)/index_src.html
	python $(CLOSURE_BUILDER) \
		$(foreach f,$(JS_ROOTS),--root=$(f) )  \
		--namespace=arch.main                  \
		--output_mode=list                     \
		--compiler_jar=$(CLOSURE_COMPILER)     \
	| sed s,^,../, | python $(INSERT_SCRIPT_TAGS) $< > $@

compile: $(TARGET)/index.html $(TARGET)/js/main.js \
	$(TARGET)/css $(TARGET)/img
clean-compile:
	rm -fr $(TARGET)

.PHONY: $(TARGET)/index.html
$(TARGET)/index.html: $(SRC)/index_src.html
	mkdir -p $(dir $@)
	echo js/main.js | python $(INSERT_SCRIPT_TAGS) $< > $@

.PHONY: $(TARGET)/js/main.js
$(TARGET)/js/main.js:
	mkdir -p $(dir $@)
	python $(CLOSURE_BUILDER)                 \
		$(foreach f,$(JS_ROOTS),--root=$(f) ) \
		-n arch.main                          \
		-o compiled                           \
		-f '--language_in=ECMASCRIPT5'        \
        -f '--compilation_level=ADVANCED_OPTIMIZATIONS' \
        $(foreach f,$(JS_EXTERNS),-f '--externs=$(f)' ) \
		--compiler_jar=$(CLOSURE_COMPILER)    \
		--output_file=$@

$(TARGET)/%: force
	mkdir -p $(dir $@)
	cp -ru $(SRC)/$* $(dir $@)
