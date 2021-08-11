<template>
  <div id="catalog-create">
    <h1>{{ title }}</h1>
    <div class="catalog-create_form">
      <el-form label-position="right" label-width="200px" :model="car" :rules="rules" ref="car">
        <el-form-item label="ID" prop="url">
          <el-input v-model="car.url"></el-input>
        </el-form-item>
        <el-form-item label="Модель" prop="name">
          <el-input v-model="car.name"></el-input>
        </el-form-item>
        <el-form-item label="Цена">
          <el-input type="number" v-model.number="car.price"></el-input>
        </el-form-item>
        <el-form-item label="Выгода">
          <el-input type="number" v-model="car.benefit"></el-input>
        </el-form-item>
        <el-form-item label="Платеж в месяц">
          <el-input type="number" v-model="car.credit"></el-input>
        </el-form-item>
        <el-form-item label="Мощность">
          <el-input type="number" v-model="car.power"></el-input>
        </el-form-item>
        <el-form-item label="Разгон до 100 км/ч">
          <el-input type="number" v-model="car.speed"></el-input>
        </el-form-item>
        <el-form-item label="Расход топлива">
          <el-input type="number" v-model="car.gasoline"></el-input>
        </el-form-item>
        <el-form-item label="SALE" prop="sale">
          <el-switch v-model="car.sale"> </el-switch>
        </el-form-item>
        <el-form-item label="Кузов" prop="type">
          <el-radio-group v-model="car.type">
            <el-radio-button label="sedan">Седан</el-radio-button>
            <el-radio-button label="hatchback">Хетчбек</el-radio-button>
            <el-radio-button label="crossover">Кроссовер</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Картинка авто" class="is-required">
          <el-upload
            action="/api/addFile/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="updateImageCar"
            :limit="1"
            :file-list="[{ url: car.image }]"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="Фотографии авто">
          <el-upload
            action="/api/addFile/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="updatePhotos"
            multiple
            :file-list="car.photos"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="Цвета авто">
          <el-upload
            action="/api/addFile/"
            :on-success="updateColorImg"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="removeColorImg"
            :on-change="changeColorImg"
            multiple
            :file-list="car.colors"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <el-color-picker class="car-color" v-if="!disabled" v-model="file.color" size="small"></el-color-picker>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('car')">Сохранить</el-button>
          <el-button @click="goCatalog()">Отмена</el-button>
        </el-form-item>
      </el-form>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  // Получаем конкретную страницу с URL, который берётся из params.
  async asyncData({ $axios, params, error }) {
    try {
      const car = await $axios.$get(`/api/cars/${params.url}`);
      return { car };
    } catch (e) {
      error({ statusCode: e.response.status });
    }
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      car: {
        url: "",
        name: "",
        price: "",
        benefit: "",
        power: "",
        speed: "",
        gasoline: "",
        type: "",
        credit: "",
        sale: false,
        photos: [],
        colors: [],
        image: null,
      },
      rules: {
        url: [{ required: true, message: "Введите id авто", trigger: "blur" }],
        name: [{ required: true, message: "Введите название авто", trigger: "blur" }],
        type: [{ required: true, message: "Выберите кузов авто", trigger: "change" }],
        image: [{ required: true, message: "Выберите картинку авто", trigger: "change" }],
      },
      title: "Добавление авто",
      description: "Добавление авто",
    };
  },
  head() {
    return {
      title: this.car.name,
      meta: [
        { hid: "description", name: "description", content: this.car.name },
        { hid: "og:title", property: "og:title", content: this.car.name },
        { hid: "og:description", property: "og:description", content: this.car.name },
      ],
    };
  },
  layout: "admin",
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        valid ? this.refreshCar() : false;
      });
    },
    refreshCar() {
      console.log(this.car);
      this.$axios
        .patch(`/api/cars/${this.car.url}`, this.car)
        .then((res) => {
          this.$message({
            message: res.data.message,
            type: "success",
          });
          this.goCatalog();
        })
        .catch((err) => this.$message.error(err.response.data.message));
    },
    handleRemove(file, fileList) {
      const fileList1 = fileList;
      fileList.forEach((item, index) => (fileList1[index].url = String(item.response).split("static")[1]));
      this.car.photos = fileList1;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    updatePhotos(response, file, fileList) {
      const fileList1 = fileList;
      fileList.forEach((item, index) => (fileList1[index].url = String(item.response).split("static")[1]));
      this.car.photos = fileList1;
    },
    removeColorImg(file, fileList) {
      const fileList1 = fileList;
      fileList.forEach((item, index) => (fileList1[index].url = String(item.response).split("static")[1]));
      this.car.colors = fileList1;
    },
    updateColorImg(response, file, fileList) {
      const fileList1 = fileList;
      fileList.forEach((item, index) => (fileList1[index].url = String(item.response).split("static")[1]));
      this.car.colors = fileList1;
    },
    changeColorImg(file, fileList) {
      const fileList1 = fileList;
      fileList.forEach((item, index) => (fileList1[index].url = String(item.response).split("static")[1]));
      this.car.colors = fileList1;
    },
    goCatalog() {
      this.$router.go(-1);
    },
    updateImageCar(response, file, fileList) {
      this.car.image = window.location.origin + response.split("static")[1];
    },
  },
};
</script>

<style lang="sass" scoped>
h1
	text-transform: uppercase
	font-weight: bold
	font-size: 24px
	line-height: 1.2
.car-color
	position: absolute
	bottom: 10px
	left: 50%
	transform: translateX(-50%)
.catalog-create_form
	margin-top: 40px
	max-width: 700px
	width: 100%
</style>
